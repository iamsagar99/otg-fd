const TransactionModel = require('../models/transaction.model')
const LoginDetailModel = require('../models/loginDetail.model.js')
const UserModel = require('../models/user.model.js')

class TransactionController {
    addTransaction = async (req, res, next) => {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const userId = req.auth_user._id;
            let inp = req.body;

            const sender = await UserModel.findById(userId).session(session);
            const receiver = await UserModel.findById(inp.receiverAccNo).session(session);

            if (!receiver) {
                await session.abortTransaction();
                session.endSession();
                return res.json({
                    result: null,
                    status: false,
                    msg: 'Receiver Does not Exist.'
                });
            }

            if (sender.balance < inp.amount) {
                await session.abortTransaction();
                session.endSession();
                return res.json({
                    result: null,
                    status: false,
                    msg: 'Insufficient Balance.'
                });
            }

            const loginDtl = await LoginDetailModel.findOne({ userId: userId }).session(session);
            if (!loginDtl) {
                await session.abortTransaction();
                session.endSession();
                return res.json({
                    result: null,
                    status: false,
                    msg: 'User not logged in. Cannot proceed with Transaction.'
                });
            }

            const currentTime = new Date();
            const sessionLen = Math.floor((currentTime - new Date(loginDtl.timeStamp)) / 1000);

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
                day: currentTime.getDate() 
            };

            sender.balance -= inp.amount;
            await sender.save({ session });

            receiver.balance += inp.amount;
            await receiver.save({ session });

            const txn = new TransactionModel(data);
            await txn.save({ session });

            await session.commitTransaction();
            session.endSession();

            res.json({
                result: txn,
                status: true,
                msg: "Transaction Successful."
            });
        } catch (err) {
            await session.abortTransaction();
            session.endSession();
            next(err);
        }
    }
}


module.exports = TransactionController;