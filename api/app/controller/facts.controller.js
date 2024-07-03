const FactsModel = require("../models/facts.model");
const LoginDetailModel = require("../models/loginDetail.model");
const Helper = require("../services/helper.service");

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
      const monthlyAgg = await this.helper_svc.getTotalAmountCountMonthly(
        userId
      );
      const meanAmount = await this.helper_svc.getMeanAmount(userId);
      const meanSessionLen = await this.helper_svc.getMeanSessionLen(userId);
      const medianDistanceMoved = await this.helper_svc.getMedianDistanceMoved(
        userId
      );
      const medianLoginAttempt = await this.helper_svc.getMedianLoginAttempt(
        userId
      );
      const most_used_auth = await this.helper_svc.getMostUsedAuthUsed(userId);

      let data = {};

      if (Age) data.Age = Age;
      if (MD && MD.MUdevice) data.most_used_device = MD.MUdevice;
      if (MD && MD.MUscore) data.most_used_device_score = MD.MUscore;
      if (MOS && MOS.MUos) data.most_used_os = MOS.MUos;
      if (MOS && MOS.MUscore) data.most_used_os_score = MOS.MUscore;
      if (MTP && MTP.MUtxnPurpose)
        data.most_used_txn_purpose = MTP.MUtxnPurpose;
      if (MTP && MTP.MUscore) data.most_used_txn_purpose_score = MTP.MUscore;
      if (most_used_auth && most_used_auth.MUauth)
        data.most_used_auth = most_used_auth.MUauth;
      if (most_used_auth && most_used_auth.MUscore)
        data.most_used_auth_score = most_used_auth.MUscore;
      if (monthlyAgg && monthlyAgg.totalAmount)
        data.totalAmountMonthly = monthlyAgg.totalAmount;
      if (monthlyAgg && monthlyAgg.count)
        data.totalCountMonthly = monthlyAgg.count;

      if (meanAmount) data.amountMean = meanAmount;
      if (meanSessionLen) data.sessionLenMean = meanSessionLen;
      if (medianDistanceMoved) data.distanceMovedMedian = medianDistanceMoved;
      if (medianLoginAttempt) data.loginAttemptMedian = medianLoginAttempt;

      if (factExist) {
        let fact = await FactsModel.updateOne(
          { userId: userId },
          { $set: data }
        );

        //update attempt in logindetail to 0
        const loginDtl = await LoginDetailModel.updateOne(
          { userId: userId },
          { $set: { attempts: 0 } }
        );
        console.log(loginDtl);
        return res.json({
          result: fact,
          loginStatus: loginDtl,
          status: true,
          msg: "Facts updated successfully",
        });
      } else {
        const newFacts = new FactsModel({ userId: userId, ...data });
        await newFacts.save();
        return res.json({
          result: newFacts,
          status: true,
          msg: "Facts created successfully",
        });
      }
    } catch (err) {
      next(err);
    }
  };
}

module.exports = FactsController;
