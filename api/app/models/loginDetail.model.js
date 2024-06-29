const mongoose = require('mongoose')

const LoginDetailSchemaDef = new mongoose.Schema({
    userId:{
        type: mongoose.Types.ObjectId,
        ref:'User',
        required: true
    },
    attempts:{
        type: Number,
        required: true,
        default:0
    },
    latitude:{
        type: Number,
        required: false
    },
    longitude:{
        type: Number,
        required:false
    },
    device: {
        type: String,
        required: false
    },
    os: {
        type: String,
        required: false
    },
    authUsed: {
        type: String,
        required: false
    },
    distanceMoved: {
        type: Number,
        required: false
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

//user logout huda request pathayera attempts reset garna parxa
// yo timestamp ra transaction ko timestamp subtract garepaxi session length aauxa
//logout hunu vanda agadi jasto most used auth method, seession len, login attempts ko aggregrate garera rakhna parxa
// or login success vayepaxi aggregrate garda ramro