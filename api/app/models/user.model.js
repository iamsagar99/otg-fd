const mongoose = require('mongoose'); 
const UserSchemaDef = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zipcode: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    accountNumber: {
        type: String,
        required: true
    },
    paymentGateway: {
        type: String,
        enum:["Wallet", "MobileBanking","InternetBanking"],
        required: true
    },
    provider: {
        type: mongoose.Types.ObjectId,
        ref:'Institution',
        required: true
    },
    kycVerified: {
        type: Boolean,
        default: false
    },
    bankAccLinked: {
        type: Boolean,
        default: false
    },
    userType: {
        type: String,
        enum:['Customer','Agent','Merchant'],
        default: 'Customer'
    },
    currentBalance: {
        type: Number,
        default: 0.00
    }
},{
    timestamps: true,
    autoCreate: true,
    autoIndex: true
});

const UserModel = mongoose.model('User', UserSchemaDef);
module.exports = UserModel;

// create dummy json for this schema
// {
//     "name": "John Doe",
//     "password": "password",
//     "dob": "1990-01-01",
//     "address": "123 Main St",
//     "city": "Anytown",
//     "state": "CA",
//     "zipcode": "12345",
//     "email": "email.email@email.com",
//     "phoneNumber": "123-456-7890",
//     "accountNumber": "1234567890",
//     "paymentGateway": "Wallet",
//     "provider": "bank1",
//     "kycVerified": false,
//     "bankAccLinked": false,
//     "userType": "Customer",
//     "currentBalance": 0.00
// }
// {
