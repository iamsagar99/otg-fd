const UserCriteriaModel  = require('../models/criteria.model.js')
const CriteriaService = require('../services/criteria.service.js')


class CriteriaController {
    constructor() {
        this.criteriaSvc = new CriteriaService();
    }
   
    setUserCriteria = async (req, res, next) => {  
        try {
            let data = req.body;
            
            const receiverTypes = ['Merchant', 'Customer', 'Agent'];
            let receiverCriteriaArray = [];
    
            for (const receiver of receiverTypes) {
                const kycVerified = data.kycVerified;
                const userType = data.userType;
                const bankAccLinked = data.bankAccLinked;
                const paymentGateway = data.paymentGateway;
    
                const sendCriteria = this.criteriaSvc.getUserCriteria('Send', kycVerified, userType, receiver, bankAccLinked, paymentGateway);
                const receiveCriteria = this.criteriaSvc.getUserCriteria('Receive', kycVerified, userType, receiver, bankAccLinked, paymentGateway);
    
                const commonCriteria = (criteria) => ({
                    total_amount_per_day: criteria.total_amount_per_day || 0,
                    max_amount_per_transaction: criteria.max_amount_per_transaction || 0,
                    max_count_per_day: criteria.max_count_per_day || 0,
                    total_amount_per_month: criteria.total_amount_per_month || 0,
                    max_count_per_month: criteria.max_count_per_month || 0,
                    remaining_amount_per_day: criteria.total_amount_per_day || 0,
                    remaining_count_per_day: criteria.max_count_per_day || 0,
                    remaining_amount_per_month: criteria.total_amount_per_month || 0,
                    remaining_count_per_month: criteria.max_count_per_month || 0
                });
    
                receiverCriteriaArray.push({
                    receiver_type: receiver,
                    send_criteria: commonCriteria(sendCriteria),
                    receive_criteria: commonCriteria(receiveCriteria)
                });
            }
    
            let userCriteria = new UserCriteriaModel({
                user: data.userId,
                receiver_criteria: receiverCriteriaArray
            });
    
            await userCriteria.save();
    
            res.json({
                result: userCriteria,
                status: true,
                msg: "User criteria saved successfully."
            });
    
        } catch (err) {
            next(err);
        }
    };
}

module.exports = CriteriaController;
