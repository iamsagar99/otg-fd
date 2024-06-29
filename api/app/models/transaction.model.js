const mongoose = require('mongoose'); 
const TransactionSchemaDef = new mongoose.Schema({
    accountNumber: {
        type: mongoose.Types.ObjectId,
        ref:'User',
        required: true
    },
    loginId:{
        type: mongoose.Types.ObjectId,
        ref:'LoginDetail',
        required: true
    },
    sessionLen: {
        type: Number,
        required: true
    },
    txnPurpose: {
        type: String,
        required: true
    },
    timeStamp: {
        type: Date,
        required: true
    },
    receiverAccNo: {
        type: mongoose.Types.ObjectId,
        ref:'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    day: {
        type: Number,
        required: true
    }
},{
    timestamps: true,
    autoCreate: true,
    autoIndex: true
});

module.exports = mongoose.model('Transaction', TransactionSchemaDef);