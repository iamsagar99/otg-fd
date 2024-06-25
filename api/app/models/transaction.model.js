const mongoose = require('mongoose'); 
const TransactionSchemaDef = new mongoose.Schema({
    accountNumber: {
        type: mongoose.Types.ObjectId,
        ref:'User',
        required: true
    },
    transactionId:{
        type: String,
        required: true
    },
    sessionLen: {
        type: Number,
        required: true
    },
    device: {
        type: String,
        required: true
    },
    os: {
        type: String,
        required: true
    },
    authUsed: {
        type: String,
        required: true
    },
    txnPurpose: {
        type: String,
        required: true
    },
    loginAttempt: {
        type: Number,
        required: true
    },
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    },
    distanceMoved: {
        type: Number,
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