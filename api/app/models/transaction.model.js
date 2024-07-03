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
    },// loginschema
    sessionLen: {
        type: Number,
        required: true
    },// login ko timestamp - transaction ko timestamp
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
    },
    status:{
        type:String,
        enum:["true", "false","Pending"],
        default:"Pending"
    },
    isFlagged:{
        type:Boolean,
        default:false
    }
},{
    timestamps: true,
    autoCreate: true,
    autoIndex: true
});
const TransactionModel = mongoose.model('TransactionModel', TransactionSchemaDef);
module.exports = TransactionModel;
// module.exports = mongoose.model('Transaction', TransactionSchemaDef);