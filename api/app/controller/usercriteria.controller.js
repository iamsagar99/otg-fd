const UserModel = require('../models/user.model'); // Adjust the path as necessary
const UserCriteriaModel = require('../models/criteria.model'); // Adjust the path as necessary
const CriteriaSvc = require('../services/criteria.service')

class CriteriaController {
    constructor() {
        this.criteria_svc = new CriteriaSvc();
    }
   
    setUserCriteria = async (req, res, next) => {  
        try {
            let data = req.body;
            console.log(data)
            // let user = await UserModel.findOne({ _id: data.userId });
    
            // if (!user) {
            //     return res.json({
            //         result: null,
            //         status: false,
            //         msg: "User not found."
            //     });
            // }
    
            const receiverTypes = ['Merchant', 'Customer', 'Agent'];
    
            // Initialize criteria array
            let receiverCriteriaArray = [];
    
            // Loop through each receiver type to set the criteria
            for (const receiver of receiverTypes) {
                // Set criteria for sending
                const kycVerified = data.kycVerified;
                const userType = data.userType
                const bankAccLinked = data.bankAccLinked;
                const paymentGateway = data.paymentGateway;

                // const sendCriteria = this.criteria_svc.getUserCriteria('Send', user.kycVerified, user.userType, receiver, user.bankAccLinked, user.paymentGateway);
                const sendCriteria = this.criteria_svc.getUserCriteria('Send', kycVerified, userType, receiver, bankAccLinked, paymentGateway);
                // Set criteria for receiving
                const receiveCriteria = this.criteria_svc.getUserCriteria('Receive', kycVerified, userType, receiver, bankAccLinked, paymentGateway);
                // const receiveCriteria = this.criteria_svc.getUserCriteria('Receive', user.kycVerified, user.userType, receiver, user.bankAccLinked, user.paymentGateway);
    
                // Combine send and receive criteria into a single criteria object
                const commonCriteria = {
                    Send_total_amount_per_day: sendCriteria.total_amount_per_day || 0,
                    max_amount_per_transaction: sendCriteria.max_amount_per_transaction || 0,
                    Send_max_count_per_day: sendCriteria.max_count_per_day || 0,
                    Send_total_amount_per_month: sendCriteria.total_amount_per_month || 0,
                    Send_max_count_per_month: sendCriteria.max_count_per_month || 0,
                    Receive_total_amount_per_day: receiveCriteria.total_amount_per_day || 0,
                    Receive_max_count_per_day: receiveCriteria.max_count_per_day || 0,
                    Receive_total_amount_per_month: receiveCriteria.total_amount_per_month || 0,
                    Receive_max_count_per_month: receiveCriteria.max_count_per_month || 0,
                    Remaining_Send_total_amount_per_day: sendCriteria.total_amount_per_day || 0,
                    Remaining_Send_count_per_day: sendCriteria.max_count_per_day || 0,
                    Remaining_Send_total_amount_per_month: sendCriteria.total_amount_per_month || 0,
                    Remaining_Send_count_per_month: sendCriteria.max_count_per_month || 0,
                    Remaining_Receive_total_amount_per_day: receiveCriteria.total_amount_per_day || 0,
                    Remaining_Receive_count_per_day: receiveCriteria.max_count_per_day || 0,
                    Remaining_Receive_total_amount_per_month: receiveCriteria.total_amount_per_month || 0,
                    Remaining_Receive_count_per_month: receiveCriteria.max_count_per_month || 0
                };
    
                receiverCriteriaArray.push({
                    receiver_type: receiver,
                    criteria: commonCriteria
                });
            }
    
            // Save the criteria
            let userCriteria = new UserCriteriaModel({
                // User: user._id,
                receiver_criteria: receiverCriteriaArray
            });
    
            // await userCriteria.save();
    
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