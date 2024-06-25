const mongoose = require('mongoose')

const LoginDetailSchemaDef = new mongoose.Schema({
    userId:{
        type: mongoose.Types.ObjectId,
        ref:'User',
        required: true
    },
    attempts:{
        type: Number,
        required: true
    },
    latitude:{
        type: Number,
        required: true
    },
    longitude:{
        type: Number,
        required:true
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
    distanceMoved: {
        type: Number,
        required: true
    },
    timeStamp: {
        type: Date,
        required: true
    }
    
},{
    timestamps: true,
    autoCreate: true,
    autoIndex: true
})

module.exports = mongoose.model('LoginDetail', LoginDetailSchemaDef);