class CriteriaService {
    getUserCriteria = (paymentType, kycStatus, userType, receiver, bankAccLinked, paymentGateway) => {
        let criteria = {
            max_amount_per_transaction: 0,
            total_amount_per_day: 0,
            max_count_per_day: 0,
            total_amount_per_month: 0,
            max_count_per_month: 0,
            max_wallet_balance: 0,
            allowed: true
        };

        if (paymentGateway === 'MobileBanking') {
            return {
                ...criteria,
                max_amount_per_transaction: 300000,
                total_amount_per_day: 300000,
                max_count_per_day: 10,
                total_amount_per_month: 9000000,
                max_count_per_month: 300
            };
        }

        if (paymentGateway === 'InternetBanking') {
            return {
                ...criteria,
                max_amount_per_transaction: 2000000,
                total_amount_per_day: 2000000,
                max_count_per_day: 100,
                total_amount_per_month: 600000000,
                max_count_per_month: 3000
            };
        }

        if (userType === 'Merchant' && paymentType === 'Send') {
            return { ...criteria, allowed: false };
        }

        if (paymentGateway === 'Wallet') {
            if (userType === 'Customer') {
                if (paymentType === 'Send') {
                    if (receiver === 'Wallet') {
                        if (kycStatus) {
                            return {
                                ...criteria,
                                max_amount_per_transaction: 25000,
                                total_amount_per_day: 50000,
                                max_count_per_day: 10,
                                total_amount_per_month: 500000,
                                max_count_per_month: 100,
                                max_wallet_balance: 50000
                            };
                        } else {
                            return { ...criteria, allowed: false };
                        }
                    } else if (receiver === 'MobileBanking' || receiver === 'InternetBanking') {
                        if (kycStatus) {
                            return {
                                ...criteria,
                                max_amount_per_transaction: 50000,
                                total_amount_per_day: 200000,
                                max_count_per_day: 10,
                                total_amount_per_month: 1000000,
                                max_count_per_month: 50
                            };
                        } else {
                            return { ...criteria, allowed: false };
                        }
                    } else {
                        return { ...criteria, allowed: false };
                    }
                } else if (paymentType === 'Receive') {
                    if (receiver === 'Wallet') {
                        if (kycStatus) {
                            return {
                                ...criteria,
                                max_amount_per_transaction: 25000,
                                total_amount_per_day: 50000,
                                max_count_per_day: 10,
                                total_amount_per_month: 500000,
                                max_count_per_month: 50,
                                max_wallet_balance: 50000
                            };
                        } else {
                            return {
                                ...criteria,
                                max_amount_per_transaction: 2500,
                                total_amount_per_day: 2500,
                                max_count_per_day: 5,
                                total_amount_per_month: 2500,
                                max_count_per_month: 5,
                                max_wallet_balance: 30000
                            };
                        }
                    } else if (receiver === 'MobileBanking' || receiver === 'InternetBanking') {
                        return {
                            ...criteria,
                            max_amount_per_transaction: 300000,
                            total_amount_per_day: 300000,
                            max_count_per_day: 10,
                            total_amount_per_month: 9000000,
                            max_count_per_month: 300
                        };
                    } else {
                        return { ...criteria, allowed: false };
                    }
                }
            } else if (userType === 'Agent') {
                if (paymentType === 'Send' && receiver === 'Wallet') {
                    return kycStatus ?
                        {
                            ...criteria,
                            max_amount_per_transaction: 10000,
                            total_amount_per_day: 25000,
                            total_amount_per_month: 100000,
                            max_count_per_day: 10,
                            max_count_per_month: 100
                        } :
                        {
                            ...criteria,
                            max_amount_per_transaction: 5000,
                            total_amount_per_day: 5000,
                            total_amount_per_month: 5000,
                            max_count_per_day: 5,
                            max_count_per_month: 50
                        };
                } else {
                    return { ...criteria, allowed: false };
                }
            }

            if (bankAccLinked && kycStatus) {
                return {
                    ...criteria,
                    max_amount_per_transaction: 50000,
                    total_amount_per_day: 100000,
                    max_count_per_day: 10,
                    total_amount_per_month: 1000000,
                    max_count_per_month: 100
                };
            } else if (bankAccLinked && !kycStatus) {
                return { ...criteria, allowed: false };
            }
        }

        return criteria;
    }
}

module.exports = CriteriaService;
