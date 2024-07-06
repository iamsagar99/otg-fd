const FactsModel = require("../models/facts.model");
const UserModel = require("../models/user.model");
const axios = require('axios')
class AnomalyService {
  checkAnomaly = async (
    accountNumber,
    loginDtl,
    sessionLen,
    txnPurpose,
    amount,
    year,
    month,
    day,
    receiverAccNo,
    timeStamp
  ) => {
    let device = loginDtl.device;
    let os = loginDtl.os;
    let auth_used = loginDtl.authUsed;
    let distanceMoved = loginDtl.distanceMoved;
    let loginTime = loginDtl.timeStamp;
    let txn_purpose = txnPurpose;
    let TimeStamp = timeStamp;
    let Amount = amount;

    // difference of timestamp in hour
    let diff = TimeStamp - loginTime;
    let diffInHours = diff / (1000 * 60 * 60);
    let speed = distanceMoved / diffInHours;

    let SUser = await UserModel.findById(accountNumber);
    let RUser = await UserModel.findById(receiverAccNo);

    let Sender_PaymentGateway = SUser.paymentGateway;
    let Sender_Provider = SUser.provider;
    let Sender_userType = SUser.userType;

    let Receiver_PaymentGateway = RUser.paymentGateway;
    let Receiver_Provider = RUser.provider;
    let Receiver_userType = RUser.userType;

    let Facts = await FactsModel.findOne({ userId: accountNumber });

    let meanSessionLen = Facts.sessionLenMean;
    let login_attempt_median = Facts.loginAttemptMedian;
    let Distance_Moved_median = Facts.distanceMovedMedian;
    let Amount_mean = Facts.amountMean;
    let most_used_device = Facts.most_used_device;
    let most_used_os = Facts.most_used_os;
    let most_used_auth_used = Facts.most_used_auth;
    let most_used_txn_purpose = Facts.most_used_txn_purpose;
    let age = Facts.Age;
    let totalAmountMonthly = Facts.totalAmountMonthly;
    let totalCountMonthly = Facts.totalCountMonthly;

    console.log(
      device,
      os,
      auth_used,
      distanceMoved,
      txn_purpose,
      TimeStamp,
      sessionLen,
      Amount,
      Sender_PaymentGateway,
      Sender_Provider,
      Sender_userType,
      Receiver_PaymentGateway,
      Receiver_Provider,
      Receiver_userType,
      meanSessionLen,
      login_attempt_median,
      Distance_Moved_median,
      Amount_mean,
      most_used_device,
      most_used_os,
      most_used_auth_used,
      most_used_txn_purpose
    );

    return;
  };

  calculateMetric = async (
    accountNumber,
    loginDtl,
    sessionLen,
    txnPurpose,
    amount,
    year,
    month,
    day,
    receiverAccNo,
    timeStamp
  ) => {
    let device = loginDtl.device;
    let os = loginDtl.os;
    let auth_used = loginDtl.authUsed;
    let distanceMoved = loginDtl.distanceMoved;
    let loginTime = loginDtl.timeStamp;
    let txn_purpose = txnPurpose;
    let TimeStamp = new Date(timeStamp);
    let Amount = amount;

    // difference of timestamp in hour
    let diff = TimeStamp - new Date(loginTime);
    let diffInHours = diff / (1000 * 60 * 60);
    let speed = distanceMoved / diffInHours;

    let SUser = await UserModel.findById(accountNumber);
    let RUser = await UserModel.findById(receiverAccNo);

    let Facts = await FactsModel.findOne({ userId: accountNumber });

    let meanSessionLen = Facts.sessionLenMean || 0;
    let login_attempt_median = Facts.loginAttemptMedian || 0;
    let Distance_Moved_median = Facts.distanceMovedMedian || 0;
    let Amount_mean = Facts.amountMean || 0;
    let most_used_device = Facts.most_used_device || '';
    let most_used_os = Facts.most_used_os || '';
    let most_used_auth_used = Facts.most_used_auth || '';
    let most_used_txn_purpose = Facts.most_used_txn_purpose || '';
    let age = Facts.Age || 18;
    let totalAmountMonthly = Facts.totalAmountMonthly || 0;
    let totalCountMonthly = Facts.totalCountMonthly || 0;

    // Create deviation features
    let sessionLenDeviation = sessionLen - meanSessionLen;
    let loginAttemptDeviation = loginDtl.attempts - login_attempt_median;
    let distanceMovedDeviation = distanceMoved - Distance_Moved_median;
    let amountDeviation = Amount - Amount_mean;


    const addAnomalyMetric = (item, mostUsedItem, mostUsedItemScore) => {
      const isMostUsedItem = item === mostUsedItem ? 1 : 0;
      const itemUsageDeviation = mostUsedItemScore - isMostUsedItem;
      return isMostUsedItem * mostUsedItemScore + itemUsageDeviation;
    };

    let score_device = addAnomalyMetric(device, most_used_device, Facts.most_used_device_score);
    let score_os = addAnomalyMetric(os, most_used_os, Facts.most_used_os_score);
    let score_auth_used = addAnomalyMetric(auth_used, most_used_auth_used, Facts.most_used_auth_score);
    let score_txn_purpose = addAnomalyMetric(txn_purpose, most_used_txn_purpose, Facts.most_used_txn_purpose_score);
    if (!score_txn_purpose){
      score_txn_purpose = 0;
    }
    let Hour = TimeStamp.getHours();
    let DayOfWeek = TimeStamp.getDay();

    const finalData = {
      age,
      speed,
      totalAmountMonthly,
      totalCountMonthly,
      sessionLenDeviation,
      loginAttemptDeviation,
      distanceMovedDeviation,
      amountDeviation,
      score_device,
      score_os,
      score_auth_used,
      score_txn_purpose,
      Hour,
      DayOfWeek
    };
    console.log("herewego")
    console.log(finalData)
    let result = this.callMlServer(finalData)
    // return finalData;
    return result;
  };

  callMlServer = async (dataObj)=>{
    //make that dataObj to array of values only
    let arr = Object.values(dataObj)
    let obj = {};
    obj.features = arr;
    console.log(obj.features)
    let url = "http://localhost:8001/predict"
    let response = await axios.post(url,obj)
    console.log(response.data)
    return response.data;
    // console.log("returned value is ie. predicted")  
    // console.log(response.data)
    // return;
  }

}


module.exports = AnomalyService;
