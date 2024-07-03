const mongoose = require("mongoose");
const TransactionModel = require("../models/transaction.model");
const LoginDetailModel = require("../models/loginDetail.model");
const UserModel = require("../models/user.model");
const Helper = require("../services/helper.service.js");
const AnomalyService = require('../services/anomaly.service.js')
class TransactionController {
  constructor() {
    this.help_svc = new Helper();
    this.anomaly_svc = new AnomalyService();
  }
  addTransaction = async (req, res, next) => {
    try {
      const userId = req.auth_user._id;
      let inp = req.body;

      const sender = await UserModel.findById(userId);
      const receiver = await UserModel.findById(inp.receiverAccNo);

      if (!receiver) {
        return res.json({
          result: null,
          status: false,
          msg: "Receiver does not exist.",
        });
      }

      if (sender.currentBalance < inp.amount) {
        return res.json({
          result: null,
          status: false,
          msg: "Insufficient balance.",
        });
      }

      const loginDtl = await LoginDetailModel.findOne({ userId: userId });
      if (!loginDtl) {
        return res.json({
          result: null,
          status: false,
          msg: "User not logged in. Cannot proceed with transaction.",
        });
      }

      console.log("loginDtl",loginDtl)
      const currentTime = new Date();
      const sessionLen = Math.floor(
        (currentTime - new Date(loginDtl.timeStamp)) / 1000
      );
      console.log("sessionlen",sessionLen)
      let data = {
        accountNumber: userId,
        loginId: loginDtl._id,
        sessionLen: sessionLen,
        txnPurpose: inp.txnPurpose,
        timeStamp: currentTime,
        receiverAccNo: inp.receiverAccNo,
        amount: inp.amount,
        year: currentTime.getFullYear(),
        month: currentTime.getMonth() + 1,
        day: currentTime.getDate(),
        status:"true"
      };
      //TODO:API CALL TO ML MODEL
      //checkAnomaly(data.accountNumber,loginDtl,data.sessionLen,data.txnPurpose,data.amount,data.year,data.month,data.day,data.receiverAccNo,data.timeStamp)
      await this.anomaly_svc.checkAnomaly(data.accountNumber,loginDtl,data.sessionLen,data.txnPurpose,data.amount,data.year,data.month,data.day,data.receiverAccNo,data.timeStamp)
      // Update sender's balance
      let dataMeta = {
        txn_purpose: inp.txnPurpose,
        session_len: sessionLen,
        amount: inp.amount,
      };
      await this.help_svc.saveMetaData("txn", sender, dataMeta);
      sender.currentBalance -= inp.amount;
      await sender.save();

      // Update receiver's balance
      receiver.currentBalance += inp.amount;
      await receiver.save();

      // Save the transaction
      const txn = new TransactionModel(data);
      await txn.save();

      res.json({
        result: txn,
        status: true,
        msg: "Transaction successful.",
      });
    } catch (err) {
      next(err);
    }
  };

  getAllTransactions = async (req, res, next) => {
    try {
      let filters = {};

      const { year, month, day, accountNumber, receiverAccNo } = req.query;

      if (year) filters.year = year;
      if (month) filters.month = month;
      if (day) filters.day = day;
      if (accountNumber) filters.accountNumber = accountNumber;
      if (receiverAccNo) filters.receiverAccNo = receiverAccNo;

      let transactions = await TransactionModel.find(filters)
        .populate("accountNumber", "name")
        .populate("receiverAccNo", "name");

      // Send the response
      res.json({
        result: transactions,
        msg: "Fetched transactions",
        status: true,
      });
    } catch (error) {
      // Pass any errors to the error handling middleware
      next(error);
    }
  };
  getTransactionByTxnId = async (req, res, next) => {
    try {
      let txnId = req.params.txnId;
      const transaction = await TransactionModel.findById(txnId)
        .populate({
          path: "accountNumber",
          select: ["name",'paymentGateway'],
        
          populate: { path: "provider", select: "name" },
        })
        .populate({
            path: "receiverAccNo",
            select: ["name",'paymentGateway'],
            populate: { path: "provider", select: "name" }, 
          });
      // Send the response
      res.json({
        result: transaction,
        msg: "Fetched transaction",
        status: true,
      });
    } catch (error) {
      // Pass any errors to the error handling middleware
      next(error);
    }
  };

getTransactionOfUser = async (req, res, next) => {
    try {
        let userId = req.params.userId;

        const UserAmt = await UserModel.findById(userId)
        let currBal = 0.0
        if(UserAmt){
            currBal = UserAmt.currentBalance
        }
        // Find transactions where userId matches either accountNumber or receiverAccNo
        const transactions = await TransactionModel.find({
            $or: [
                { accountNumber: userId },
                { receiverAccNo: userId }
            ]
        })
        .populate({
            path: "accountNumber",
            select: ["name", 'paymentGateway'],
            populate: { path: "provider", select: "name" },
        })
        .populate({
            path: "receiverAccNo",
            select: ["name", 'paymentGateway'],
            populate: { path: "provider", select: "name" },
        })
        .sort({ timeStamp: -1 })  // Sort by timeStamp in descending order
        .exec();

        // Modify each transaction item to add 'type' based on userId
        const modifiedTransactions = transactions.map(transaction => {
            let type = '';
            if (transaction.accountNumber && transaction.accountNumber._id.toString() === userId) {
                type = "sender";
            }
            if (transaction.receiverAccNo && transaction.receiverAccNo._id.toString() === userId) {
                type = "receiver";
            }
            return {
                ...transaction.toObject(),
                type
            };
        });

        res.json({
            result: modifiedTransactions,
            msg: "Fetched transactions",
            status: true,
            currbal:currBal
        });
    } catch (error) {
        next(error);
    }
}


  
}

module.exports = TransactionController;
