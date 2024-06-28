class CriteriaService {
    //  getUserCriteria = (paymentType, kycStatus, userType, receiver, bankAccLinked, paymentGateway) => {
    //     let criteria = {};
        
    //     if (paymentGateway === 'MobileBanking') {
    //         criteria = {
    //             max_amount_per_transaction: 300000,
    //             total_amount_per_day: 300000,
    //             max_count_per_day: 10,
    //             total_amount_per_month: 9000000,
    //             max_count_per_month: 300
    //         };
    //         return criteria;
    //     }
        
    //     if (paymentGateway === 'InternetBanking') {
    //         criteria = {
    //             max_amount_per_transaction: 2000000,
    //             total_amount_per_day: 2000000,
    //             max_count_per_day: 100,
    //             total_amount_per_month: 600000000,
    //             max_count_per_month: 3000
    //         };
    //         return criteria;
    //     }
        
    //     if (userType === 'Customer') {
    //         if (paymentType === 'Send') {
    //             if (receiver === 'Wallet') {
    //                 if (kycStatus) {
    //                     criteria = {
    //                         max_amount_per_transaction: 25000,
    //                         total_amount_per_day: 50000,
    //                         max_count_per_day: 10,
    //                         total_amount_per_month: 500000,
    //                         max_count_per_month: 100
    //                     };
    //                 } else {
    //                     criteria = {
    //                         allowed: false
    //                     };
    //                 }
    //             } else if (receiver === 'MobileBanking' || receiver === 'InternetBanking') {
    //                 if (kycStatus) {
    //                     criteria = {
    //                         max_amount_per_transaction: 50000,
    //                         total_amount_per_day: 200000,
    //                         max_count_per_day: 10,
    //                         total_amount_per_month: 1000000,
    //                         max_count_per_month: 50
    //                     };
    //                 } else {
    //                     criteria = {
    //                         allowed: false
    //                     };
    //                 }
    //             }
    //         } else if (paymentType === 'Receive') {
    //             if (receiver === 'Wallet') {
    //                 if (kycStatus) {
    //                     criteria = {
    //                         max_amount_per_transaction: 25000,
    //                         total_amount_per_day: 50000,
    //                         max_count_per_day: 10,
    //                         total_amount_per_month: 500000,
    //                         max_count_per_month: 50
    //                     };
    //                 } else {
    //                     criteria = {
    //                         max_amount_per_transaction: 2500,
    //                         total_amount_per_day: 2500,
    //                         max_count_per_day: 5,
    //                         total_amount_per_month: 2500,
    //                         max_count_per_month: 5
    //                     };
    //                 }
    //             } else if (receiver === 'MobileBanking' || receiver === 'InternetBanking') {
    //                 criteria = {
    //                     max_amount_per_transaction: 300000,
    //                     total_amount_per_day: 300000,
    //                     max_count_per_day: 10,
    //                     total_amount_per_month: 9000000,
    //                     max_count_per_month: 300
    //                 };
    //             }
    //         }
    
    //         // Wallet Balance
    //         criteria.max_wallet_balance = kycStatus ? 500000 : 30000;
    //     } else if (userType === 'Agent') {
    //         if (paymentType === 'Send' && receiver === 'Wallet') {
    //             criteria = kycStatus ? 
    //                 {
    //                     max_amount_per_transaction: 10000,
    //                     total_amount_per_day: 25000,
    //                     total_amount_per_month: 100000
    //                 } : 
    //                 {
    //                     max_amount_per_transaction: 5000,
    //                     total_amount_per_day: 5000,
    //                     total_amount_per_month: 5000
    //                 };
    //         }
    //     }
    
    //     // Payment transaction limit for both Customer and Agent
    //     if (receiver === 'Merchant') {
    //         criteria = kycStatus ? 
    //             {
    //                 ...criteria,
    //                 max_amount_per_transaction: 50000,
    //                 total_amount_per_day: 100000,
    //                 max_count_per_day: 10,
    //                 total_amount_per_month: 500000,
    //                 max_count_per_month: 100
    //             } : 
    //             {
    //                 ...criteria,
    //                 max_amount_per_transaction: 5000,
    //                 total_amount_per_day: 5000,
    //                 max_count_per_day: 10,
    //                 total_amount_per_month: 500000,
    //                 max_count_per_month: 100
    //             };
    //     }
    
    //     // For wallet accounts linked with bank
    //     if (bankAccLinked && kycStatus) {
    //         criteria = {
    //             ...criteria,
    //             max_amount_per_transaction: 50000,
    //             total_amount_per_day: 100000,
    //             max_count_per_day: 10,
    //             total_amount_per_month: 1000000,
    //             max_count_per_month: 100
    //         };
    //     }
        
    //     return criteria;
    // };
     getUserCriteria = (paymentType, kycStatus, userType, receiver, bankAccLinked, paymentGateway) => {
        let criteria = {};
        
        if (paymentGateway === 'MobileBanking') {
            criteria = {
                max_amount_per_transaction: 300000,
                total_amount_per_day: 300000,
                max_count_per_day: 10,
                total_amount_per_month: 9000000,
                max_count_per_month: 300
            };
            return criteria;
        }
        
        if (paymentGateway === 'InternetBanking') {
            criteria = {
                max_amount_per_transaction: 2000000,
                total_amount_per_day: 2000000,
                max_count_per_day: 100,
                total_amount_per_month: 600000000,
                max_count_per_month: 3000
            };
            return criteria;
        }
        
        if (userType==='Merchant'){
            if(paymentType==='Send'){
              return  criteria = {
                    allowed: false
                };
            }
        }
        
        if (userType === 'Customer') {
            if (paymentType === 'Send') {
                if (receiver === 'Wallet') {
                    if (kycStatus) {
                        criteria = {
                            max_amount_per_transaction: 25000,
                            total_amount_per_day: 50000,
                            max_count_per_day: 10,
                            total_amount_per_month: 500000,
                            max_count_per_month: 100
                        };
                    } else {
                        criteria = {
                            allowed: false
                        };
                    }
                } else if (receiver === 'MobileBanking' || receiver === 'InternetBanking') {
                    if (kycStatus) {
                        criteria = {
                            max_amount_per_transaction: 50000,
                            total_amount_per_day: 200000,
                            max_count_per_day: 10,
                            total_amount_per_month: 1000000,
                            max_count_per_month: 50
                        };
                    } else {
                        criteria = {
                            allowed: false
                        };
                    }
                } else {
                    criteria = {
                        allowed: false
                    };
                }
            } else if (paymentType === 'Receive') {
                if (receiver === 'Wallet') {
                    if (kycStatus) {
                        criteria = {
                            max_amount_per_transaction: 25000,
                            total_amount_per_day: 50000,
                            max_count_per_day: 10,
                            total_amount_per_month: 500000,
                            max_count_per_month: 50
                        };
                    } else {
                        criteria = {
                            max_amount_per_transaction: 2500,
                            total_amount_per_day: 2500,
                            max_count_per_day: 5,
                            total_amount_per_month: 2500,
                            max_count_per_month: 5
                        };
                    }
                } else if (receiver === 'MobileBanking' || receiver === 'InternetBanking') {
                    criteria = {
                        max_amount_per_transaction: 300000,
                        total_amount_per_day: 300000,
                        max_count_per_day: 10,
                        total_amount_per_month: 9000000,
                        max_count_per_month: 300
                    };
                } else {
                    criteria = {
                        allowed: false
                    };
                }
            }
    
            // Wallet Balance
            criteria.max_wallet_balance = kycStatus ? 500000 : 30000;
        } else if (userType === 'Agent') {
            if (paymentType === 'Send' && receiver === 'Wallet') {
                criteria = kycStatus ? 
                    {
                        max_amount_per_transaction: 10000,
                        total_amount_per_day: 25000,
                        total_amount_per_month: 100000
                    } : 
                    {
                        max_amount_per_transaction: 5000,
                        total_amount_per_day: 5000,
                        total_amount_per_month: 5000
                    };
            } else {
                criteria = {
                    allowed: false
                };
            }
        }
    
        // Payment transaction limit for both Customer and Agent
        if (receiver === 'Merchant') {
            criteria = kycStatus ? 
                {
                    ...criteria,
                    max_amount_per_transaction: 50000,
                    total_amount_per_day: 100000,
                    max_count_per_day: 10,
                    total_amount_per_month: 500000,
                    max_count_per_month: 100
                } : 
                {
                    ...criteria,
                    max_amount_per_transaction: 5000,
                    total_amount_per_day: 5000,
                    max_count_per_day: 10,
                    total_amount_per_month: 500000,
                    max_count_per_month: 100
                };
        }
    
        // For wallet accounts linked with bank
        if (bankAccLinked && kycStatus) {
            criteria = {
                ...criteria,
                max_amount_per_transaction: 50000,
                total_amount_per_day: 100000,
                max_count_per_day: 10,
                total_amount_per_month: 1000000,
                max_count_per_month: 100
            };
        } else if (bankAccLinked && !kycStatus) {
            criteria = {
                allowed: false
            };
        }
        
        return criteria;
    }
    
    
}
module.exports = CriteriaService;
