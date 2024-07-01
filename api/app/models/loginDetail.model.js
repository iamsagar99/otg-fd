const mongoose = require('mongoose')

const LoginDetailSchemaDef = new mongoose.Schema({
    userId:{
        type: mongoose.Types.ObjectId,
        ref:'User',
        required: true
    },// login ko bela
    attempts:{
        type: Number,
        required: true,
        default:0
    },// login ko bela
    latitude:{
        type: Number,
        required: false
    },//login vaisakepaxi
    longitude:{
        type: Number,
        required:false
    },//login vaisakepaxi
    device: {
        type: String,
        required: false
    },//login vaisakepaxi
    os: {
        type: String,
        required: false
    },//login vaisakepaxi
    authUsed: {
        type: String,
        required: false
    },//login vaisakepaxi
    distanceMoved: {
        type: Number,
        required: false
    },//login vaisakepaxi
    timeStamp: {
        type: Date,
        required: true
    }
    
},{
    timestamps: true,
    autoCreate: true,
    autoIndex: true
})
const LoginDetailModel = mongoose.model('LoginDetailModel', LoginDetailSchemaDef);
module.exports = LoginDetailModel;
// module.exports = mongoose.model('LoginDetail', LoginDetailSchemaDef);

//user logout huda request pathayera attempts reset garna parxa
// yo timestamp ra transaction ko timestamp subtract garepaxi session length aauxa
//logout hunu vanda agadi jasto most used auth method, seession len, login attempts ko aggregrate garera rakhna parxa
// or login success vayepaxi aggregrate garda ramro