const mongoose = require('mongoose')

const FactsSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Types.ObjectId,
        required: true,
        ref:"User"
    },// one record for one user
    Age:{
        type: Number,
        required:true
    },
    most_used_device:{
        type: String,
        required:true
    },// at end of logout
    most_used_os:{
        type: String,
        required:true
    },// at the end of the logout
    most_used_txn_purpose:{
        type: String,
        required:true
    },// at the end of the logout
    most_used_device_score:{
        type: Number,
        required:true
    },// at the end of the logout
    most_used_os_score:{
        type: Number,
        required:true
    },// at the end of the logout
    most_used_txn_purpose_score:{
        type: Number,
        required:true
    },// at the end of the logout
    totalAmountMonthly:{
        type: Number,
        required:true
    },// at the end of the logout
    totalCountMonthly:{
        type: Number,
        required:true
    }// at the end of the logout
},{
    timestamps: true,
    autoCreate: true,
    autoIndex: true
});
const FactsModel = mongoose.model('FactsModel', FactsSchema);
module.exports = FactsModel;