const mongoose = require('mongoose');

const transactionLimitSchema = new mongoose.Schema({
  userType: { type: String, enum: ['Customer', 'Agent', 'Merchant'], required: true },
  kycStatus: { type: Boolean, required: true },
  paymentType: { type: String, enum: ['Send', 'Receive'], required: true },
  receiverType: { type: String, enum: ['Wallet', 'MobileBanking', 'InternetBanking'], required: true },
  bankAccLinked: { type: Boolean, required: true },
  paymentGateway: { type: String, enum: ['Wallet', 'MobileBanking', 'InternetBanking'], required: true },
  max_amount_per_transaction: { type: Number, required: true },
  total_amount_per_day: { type: Number, required: true },
  max_count_per_day: { type: Number, required: true },
  total_amount_per_month: { type: Number, required: true },
  max_count_per_month: { type: Number, required: true },
  max_wallet_balance: { type: Number,required:false }  // This field is optional based on the criteria
});

const TransactionLimit = mongoose.model('TransactionLimit', transactionLimitSchema);
module.exports = TransactionLimit;