const FactsModel = require('../models/facts.model')
const Helper = require('../services/helper.service')

class FactsController{
    constructor(){
        this.helper_svc = new Helper()
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
      
          const data = {
            age: Age || 0,
            most_used_device: MD ? MD.MUdevice : '',
            most_used_device_score: MD ? MD.MUscore : 0,
            most_used_os: MOS ? MOS.MUos : '',
            most_used_os_score: MOS ? MOS.MUscore : 0,
            most_used_txn_purpose: MTP ? MTP.MUtxnPurpose : '',
            most_used_txn_purpose_score: MTP ? MTP.MUscore : 0,
            totalAmountMonthly: monthlyAgg ? monthlyAgg.totalAmount : 0,
            totalCountMonthly: monthlyAgg ? monthlyAgg.count : 0,
          };
      
          if (factExist) {
            // Update existing record
            let fact = await FactsModel.updateOne({ userId: userId }, { $set: data });
            res.json({
                result:fact,
                status: true,
                msg:"Facts updated successfully"
            })
          } else {
            // Create new record
            const newFacts = new FactsModel({ userId: userId, ...data });
            await newFacts.save();
            res.json({
                result:newFacts,
                status: true,
                msg:"Facts Created successfully"
            })
          }
        } catch (err) {
        //   console.log(err);
        //   res.status(500).json({
        //     message: "Internal Server Error"
        //   });
        next(err)
        }
    }
}

module.exports = FactsController;