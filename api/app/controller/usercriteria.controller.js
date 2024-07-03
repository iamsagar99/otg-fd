const TransactionLimitModel = require('../models/criteria.model');
const CriteriaService = require('../services/criteria.service');
class TransactionLimitController {
    constructor() {
        this.criteriaService = new CriteriaService();
    }

    createTransactionLimits = async (req, res, next) => {
        try {
            const userTypes = ['Customer', 'Agent', 'Merchant'];
            const kycStatuses = [true, false];
            const paymentTypes = ['Send', 'Receive'];
            const receivers = ['Wallet', 'MobileBanking', 'InternetBanking'];
            const bankAccLinkStatuses = [true, false];
            const paymentGateways = ['Wallet', 'MobileBanking', 'InternetBanking'];

            const criteriaList = [];

            for (let userType of userTypes) {
                for (let kycStatus of kycStatuses) {
                    for (let paymentType of paymentTypes) {
                        for (let receiver of receivers) {
                            for (let bankAccLinked of bankAccLinkStatuses) {
                                for (let paymentGateway of paymentGateways) {
                                    let criteria = this.criteriaService.getUserCriteria(paymentType, kycStatus, userType, receiver, bankAccLinked, paymentGateway);

                                    if (criteria.allowed !== false) {  // Skip criteria that are not allowed
                                        const criteriaExists = await TransactionLimitModel.findOne({
                                            userType,
                                            kycStatus,
                                            paymentType,
                                            receiverType: receiver,
                                            bankAccLinked,
                                            paymentGateway
                                        });

                                        if (!criteriaExists) {
                                            criteriaList.push({
                                                userType,
                                                kycStatus,
                                                paymentType,
                                                receiverType: receiver,
                                                bankAccLinked,
                                                paymentGateway,
                                                max_amount_per_transaction: criteria.max_amount_per_transaction,
                                                total_amount_per_day: criteria.total_amount_per_day,
                                                max_count_per_day: criteria.max_count_per_day,
                                                total_amount_per_month: criteria.total_amount_per_month,
                                                max_count_per_month: criteria.max_count_per_month,
                                                max_wallet_balance: criteria.max_wallet_balance // Only if necessary
                                            });
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            await TransactionLimitModel.insertMany(criteriaList);

            res.json({
                result: criteriaList,
                status: true,
                msg: "Transaction limits added successfully."
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = TransactionLimitController;
