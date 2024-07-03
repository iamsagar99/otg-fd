const FactsModel = require('../models/facts.model');
const LoginDetailModel = require('../models/loginDetail.model');
const Helper = require('../services/helper.service');

class FactsController {
    constructor() {
        this.helper_svc = new Helper();
    }

    addFacts = async (req, res, next) => {
        try {
            const userId = req.auth_user._id;

            const factExist = await FactsModel.findOne({ userId: userId });
            const Age = await this.helper_svc.getAgeUser(userId);
            const MD = await this.helper_svc.getMostUsedDevice(userId);
            const MOS = await this.helper_svc.getMostUsedOS(userId);
            const MTP = await this.helper_svc.getMostUsedTxnPurpose(userId);
            const monthlyAgg = await this.helper_svc.getTotalAmountCountMonthly(userId);
            const meanAmount = await this.helper_svc.getMeanAmount(userId);
            const meanSessionLen = await this.helper_svc.getMeanSessionLen(userId);
            const medianDistanceMoved = await this.helper_svc.getMedianDistanceMoved(userId);
            const medianLoginAttempt = await this.helper_svc.getMedianLoginAttempt(userId);
            const most_used_auth = await this.helper_svc.getMostUsedAuthUsed(userId);
            

            const data = {
                Age: Age || 0,
                most_used_device: MD ? MD.MUdevice : '',
                most_used_device_score: MD ? MD.MUscore : 0,
                most_used_os: MOS ? MOS.MUos : '',
                most_used_os_score: MOS ? MOS.MUscore : 0,
                most_used_txn_purpose: MTP ? MTP.MUtxnPurpose : '',
                most_used_txn_purpose_score: MTP ? MTP.MUscore : 0,
                most_used_auth: most_used_auth ? most_used_auth.MUauth : '',
                most_used_auth_score: most_used_auth ? most_used_auth.MUscore : 0,
                totalAmountMonthly: monthlyAgg ? monthlyAgg.totalAmount : 0,
                totalCountMonthly: monthlyAgg ? monthlyAgg.count : 0,
                
                amountMean: meanAmount || 0,
                sessionLenMean: meanSessionLen || 0,
                distanceMovedMedian: medianDistanceMoved || 0,
                loginAttemptMedian: medianLoginAttempt || 0
            };
            console.log(data)

            if (factExist) {
                let fact = await FactsModel.updateOne({ userId: userId }, { $set: data });
                
                //update attempt in logindetail to 0
                const loginDtl = await LoginDetailModel.updateOne({userId:userId},{$set:{attempts:0}})
                console.log(loginDtl)
                return res.json({
                    result: fact,
                    loginStatus:loginDtl,
                    status: true,
                    msg: "Facts updated successfully"
                });
            } else {
                const newFacts = new FactsModel({ userId: userId, ...data });
                await newFacts.save();
                return res.json({
                    result: newFacts,
                    status: true,
                    msg: "Facts created successfully"
                });
            }
        } catch (err) {
            next(err);
        }
    }
}

module.exports = FactsController;
