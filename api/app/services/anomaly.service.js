const FactsModel = require("../models/facts.model");
const UserModel = require("../models/user.model");

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
    let txn_purpose = txnPurpose;
    let TimeStamp = timeStamp;
    let Amount = amount;

    let SUser = await UserModel.findById(accountNumber);
    let RUser = await UserModel.findById(receiverAccNo);

    let Sender_PaymentGateway = SUser.paymentGateway;
    let Sender_Provider = SUser.provider;
    let Sender_userType = SUser.userType;

    let Receiver_PaymentGateway = RUser.paymentGateway;
    let Receiver_Provider = RUser.provider;
    let Receiver_userType = RUser.userType;
    
    let Facts = await FactsModel.findOne({userId:accountNumber})
    // if(Facts){
    //     console.log("factss are")
    //     console.log(Facts)
    // }else{
    //     console.log("fact cant be found")
    //     return;
    // }
    let meanSessionLen = Facts.sessionLenMean;
    let login_attempt_median = Facts.loginAttemptMedian;
    let Distance_Moved_median = Facts.distanceMovedMedian;
    let Amount_mean = Facts.amountMean;
    let most_used_device = Facts.most_used_device;
    let most_used_os = Facts.most_used_os;
    let most_used_auth_used = Facts.most_used_auth;
    let most_used_txn_purpose = Facts.most_used_txn_purpose;

    //print all in single console.log
    console.log(
      device, //done
      os, // done
      auth_used, //no
      distanceMoved, //no
      txn_purpose, //yes
      TimeStamp, //yes
      sessionLen, //yes
      Amount,//yes
      Sender_PaymentGateway, //yes
      Sender_Provider, //yes as object id
      Sender_userType, // yes
      Receiver_PaymentGateway, //yes
      Receiver_Provider, //yes
      Receiver_userType, //yes
      meanSessionLen, //no
      login_attempt_median, //no
      Distance_Moved_median, //no
      Amount_mean, //no
      most_used_device, //no
      most_used_os, //no
      most_used_auth_used, //no
      most_used_txn_purpose //no
    );

    return;
    /*
        // ['device',
         'os',
          'auth_used'
          ,'Distance Moved (km)',
                    from loginDetail
        // 'txn_purpose'
        , 'TimeStamp',
         Session_Len,  
         'Amount'
                     , from transaction
        //'Sender_PaymentGateway',
         'Sender_Provider',
          'Sender_userType',
                         from user
        // 'Receiver_PaymentGateway',
         'Receiver_Provider'
                    , from user
        //
        // 'Session_Len mean',
        'login_attempt median',
        'Distance Moved (km) median',
         'Amount mean',
        // 'most_used_device',
         'most_used_os', 
         'most_used_auth_used',
          'most_used_txn_purpose'
                        from facts
*/
  };
}

module.exports = AnomalyService;
