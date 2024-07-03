const UserModel = require('../models/user.model');
const TransactionLimitModel = require('../models/criteria.model');
const TransactionModel = require('../models/transaction.model');
const bcrypt = require('bcrypt')
// const CriteriaService = require('../services/criteria.service');

const checkCriteria = async (req, res, next) => {
    try {
        // Get the authenticated user
        let user = req.auth_user;
        const transactionPurposes = [
            'Family Expenses', 'Commission', 'Educational Expenses', 'EMI payment',
            'Loan or interest payment', 'Rent', 'Repair and Maintenance', 'Savings',
            'Travel and Tour', 'Bill Sharing', 'Personal Use', 'Other'
        ];
        
        // Function to check and update the purpose
        function checkAndUpdatePurpose(purpose) {
            if (!transactionPurposes.includes(purpose)) {
                purpose = 'Other';
            }
            return purpose;
        }
        req.body.txnPurpose  = checkAndUpdatePurpose(req.body.txnPurpose)
        
        // chcek is password matches or not
        let pass = req.body.authValue;
        let isMatch = bcrypt.compareSync(pass, user.password);
        if(!isMatch){
            return res.json({
                result: null,
                status: false,
                msg: "Invalid Credentials"
            })
        }

        //check if receiver exists
        if (!req.body.receiverAccNo) {
            return res.json({
                result: null,
                status: false,
                msg: "Receiver Account Number is required"
            });
        }



        // Sending user details
        let userType = user.userType;
        let kycStatus = user.kycVerified;
        let paymentType = 'Send';
        let bankAccLinked = user.bankAccLinked;
        let paymentGateway = user.paymentGateway;

        if (userType==="Merchant") {
            return res.json({
                result: null,
                status: false,
                msg: "Merchant Not allowed to perform outgoing transaction."
            })
        }
        // Fetch the receiving user details
        
        let receiverUser = await UserModel.findById(req.body.receiverAccNo);
        if (!receiverUser) {
            return res.json({
                result: null,
                status: false,
                msg: "Receiver not found"
            });
        }
        let receiverUserType = receiverUser.userType;
        let receiverKycStatus = receiverUser.kycVerified;
        let receiverBankAccLinked = receiverUser.bankAccLinked;
        let receiverPaymentGateway = receiverUser.paymentGateway;
        let receiverPaymentType = 'Receive';

        // Transaction amount
        let amount = req.body.amount;
        console.log("receiveruser",receiverUser)
        // Check criteria for the sending user
        let receiverType = receiverPaymentGateway;
        let senderCriteria = await TransactionLimitModel.findOne({
            userType,
            kycStatus,
            paymentType,
            receiverType,
            bankAccLinked,
            paymentGateway
        });

        if (!senderCriteria) {
            return res.json({
                result: null,
                status: false,
                msg: "Sender criteria not found"
            });
        }

        // Check criteria for the receiving user
        let receiverCriteria = await TransactionLimitModel.findOne({
            userType: receiverUserType,
            kycStatus: receiverKycStatus,
            paymentType: receiverPaymentType,
            receiverType: paymentGateway,
            bankAccLinked: receiverBankAccLinked,
            paymentGateway: receiverPaymentGateway
        });

        if (!receiverCriteria) {
            return res.json({
                result: null,
                status: false,
                msg: "Receiver criteria not found"
            });
        }
        console.log("senderCriteria",senderCriteria)
        console.log("receiverCriteria",receiverCriteria)
        // Validate the transaction amount against the sender's criteria
        if (amount > senderCriteria.max_amount_per_transaction) {
            return res.json({
                result: null,
                status: false,
                msg: `Transaction amount exceeds the sender's maximum amount per transaction limit of ${senderCriteria.max_amount_per_transaction}`
            });
        }

        // Check the sender's daily and monthly limits
        const senderDailyTotal = await getDailyTotal(user._id);
        const senderMonthlyTotal = await getMonthlyTotal(user._id);

        if ((senderDailyTotal.totalAmount + amount) > senderCriteria.total_amount_per_day) {
            return res.json({
                result: null,
                status: false,
                msg: `Transaction amount exceeds the sender's total daily limit of ${senderCriteria.total_amount_per_day}`
            });
        }

        if ((senderMonthlyTotal.totalAmount + amount) > senderCriteria.total_amount_per_month) {
            return res.json({
                result: null,
                status: false,
                msg: `Transaction amount exceeds the sender's total monthly limit of ${senderCriteria.total_amount_per_month}`
            });
        }

        if ((senderDailyTotal.totalCount + 1) > senderCriteria.max_count_per_day) {
            return res.json({
                result: null,
                status: false,
                msg: `Transaction count exceeds the sender's maximum count per day limit of ${senderCriteria.max_count_per_day}`
            });
        }

        if ((senderMonthlyTotal.totalCount + 1) > senderCriteria.max_count_per_month) {
            return res.json({
                result: null,
                status: false,
                msg: `Transaction count exceeds the sender's maximum count per month limit of ${senderCriteria.max_count_per_month}`
            });
        }

        // Validate the transaction amount against the receiver's criteria
        if (amount > receiverCriteria.max_amount_per_transaction) {
            return res.json({
                result: null,
                status: false,
                msg: `Transaction amount exceeds the receiver's maximum amount per transaction limit of ${receiverCriteria.max_amount_per_transaction}`
            });
        }

        // Check the receiver's daily and monthly limits
        const receiverDailyTotal = await getDailyTotal(receiverUser._id);
        const receiverMonthlyTotal = await getMonthlyTotal(receiverUser._id);

        if ((receiverDailyTotal.totalAmount + amount) > receiverCriteria.total_amount_per_day) {
            return res.json({
                result: null,
                status: false,
                msg: `Transaction amount exceeds the receiver's total daily limit of ${receiverCriteria.total_amount_per_day}`
            });
        }

        if ((receiverMonthlyTotal.totalAmount + amount) > receiverCriteria.total_amount_per_month) {
            return res.json({
                result: null,
                status: false,
                msg: `Transaction amount exceeds the receiver's total monthly limit of ${receiverCriteria.total_amount_per_month}`
            });
        }

        if ((receiverDailyTotal.totalCount + 1) > receiverCriteria.max_count_per_day) {
            return res.json({
                result: null,
                status: false,
                msg: `Transaction count exceeds the receiver's maximum count per day limit of ${receiverCriteria.max_count_per_day}`
            });
        }

        if ((receiverMonthlyTotal.totalCount + 1) > receiverCriteria.max_count_per_month) {
            return res.json({
                result: null,
                status: false,
                msg: `Transaction count exceeds the receiver's maximum count per month limit of ${receiverCriteria.max_count_per_month}`
            });
        }

        // If all checks pass, proceed to the next middleware
        next();
    } catch (error) {
        next(error);
    }
};

const getDailyTotal = async (userId) => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const transactions = await TransactionModel.aggregate([
        { $match: { accountNumber: userId, timeStamp: { $gte: startOfDay, $lt: endOfDay } } },
        {
            $group: {
                _id: null,
                totalAmount: { $sum: "$amount" },
                totalCount: { $sum: 1 }
            }
        }
    ]);

    return transactions[0] || { totalAmount: 0, totalCount: 0 };
};

const getMonthlyTotal = async (userId) => {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    const endOfMonth = new Date(startOfMonth);
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);

    const transactions = await TransactionModel.aggregate([
        { $match: { accountNumber: userId, timeStamp: { $gte: startOfMonth, $lt: endOfMonth } } },
        {
            $group: {
                _id: null,
                totalAmount: { $sum: "$amount" },
                totalCount: { $sum: 1 }
            }
        }
    ]);

    return transactions[0] || { totalAmount: 0, totalCount: 0 };
};

module.exports = checkCriteria;
