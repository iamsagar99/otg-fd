const mongoose = require('mongoose'); 
const ProviderSchemaDef = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    paymentGateway: {
        type: String,
        enum:["Wallet", "MobileBanking","InternetBanking"],
        required: true
    }
},{
    timestamps: true,
    autoCreate: true,
    autoIndex: true
});

const InstitutionModel = mongoose.model('Institution', ProviderSchemaDef);
module.exports = InstitutionModel;

// create dummy value for this 
// {
//     "name": "Bank of America",
//     "paymentGateway": "InternetBanking"
// }
// {
//     "name": "Wells Fargo",
//     "paymentGateway": "MobileBanking"
// }
// {
//     "name": "Esewa",
//     "paymentGateway": "Wallet"
// }
// {
//     "name": "Khalti",
//     "paymentGateway": "Wallet"
// }
// {
//     "name": "IME Pay",
//     "paymentGateway": "Wallet"
// }
// {
//     "name": "Digi Prabhu",
//     "paymentGateway": "MobileBanking"
// }