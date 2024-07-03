const mongoose = require('mongoose')
const axios = require("axios");
const useragent = require("express-useragent");
const crypto = require("crypto");
const UserModel = require("../models/user.model");
const MetadataModel = require("../models/metadatalog.model");
const TransactionModel = require("../models/transaction.model.js");
const LoginDetailModel = require('../models/loginDetail.model.js');
const AggregationService  = require("../services/aggregation.service.js")

class Helper {
  constructor(){
    this.agg_svc = new AggregationService();
  }
  generateRandomString = () => {
    let length = 16;
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const randomBytes = crypto.randomBytes(16);
    let randomString = "";
    for (let i = 0; i < length; i++) {
      const index = randomBytes[i] % characters.length;
      randomString += characters.charAt(index);
    }
    return randomString;
  };

  getGeoStats = async (req) => {
    try {
      let ip = req.ip === "::1" ? "127.0.0.1" : req.ip; // Handle localhost for testing
      // ip = '110.44.114.34'
      const url = `http://ip-api.com/json/${ip}`;
      const response = await axios.get(url);
      const geolocation = response.data;
      let geostat = {
        url: req.url,
        method: req.method,
        headers: req.headers,
        body: req.body,
        ip: ip,
        geolocation: {
          latitude: geolocation.lat,
          longitude: geolocation.lon,
          city: geolocation.city,
          state: geolocation.state ?? "N/A",
          region: geolocation.regionName,
          country: geolocation.country,
        },
      };
      return geostat;
    } catch (error) {
      throw error;
    }
  };

  getDeviceInfo = async (req) => {
    try {
      const userAgent = req.headers["user-agent"];

      const osRegex =
        /(Windows NT \d+\.\d+|Android \d+\.\d+|iOS \d+\_\d+_\d+|Mac OS X \d+\_\d+(\_\d+)?|Linux)/i;
      const deviceRegex = /(Mobile|Tablet|iPad|iPhone|Android|Windows|Linux)/i;

      const osMatch = userAgent.match(osRegex);
      const os = osMatch ? osMatch[0] : "Unknown OS";

      const deviceMatch = userAgent.match(deviceRegex);
      const device = deviceMatch ? deviceMatch[0] : "Unknown Device";

      let info = {
        device,
        os,
      };
      return info;
    } catch (error) {
      throw error;
    }
  };

  haversineDistance(lat1, lon1, lat2, lon2) {
    const toRadians = (degrees) => degrees * (Math.PI / 180);

    lat1 = toRadians(lat1);
    lon1 = toRadians(lon1);
    lat2 = toRadians(lat2);
    lon2 = toRadians(lon2);

    const dlon = lon2 - lon1;
    const dlat = lat2 - lat1;

    const a =
      Math.sin(dlat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) ** 2;
    const c = 2 * Math.asin(Math.sqrt(a));

    const km = 6371 * c; // Radius of Earth in kilometers
    return km;
  }

  async getAgeUser(userId) {
    let user = await UserModel.findOne({ _id: userId});
    let dob = user.dob;
    let age = new Date().getFullYear() - new Date(dob).getFullYear();
    return age;
}

async getMostUsedDevice(userId) {
    try {
        const deviceUsage = await MetadataModel.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId) } },
            { $unwind: "$device" },
            { $group: { _id: "$device", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 1 },
        ]);

        const totalDevices = await MetadataModel.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId) } },
            { $unwind: "$device" },
            { $group: { _id: null, count: { $sum: 1 } } },
        ]);

        if (deviceUsage.length === 0 || totalDevices.length === 0) {
            return {
                message: "No device data available",
                device: null,
                score: 0,
            };
        }

        const mostUsedDevice = deviceUsage[0]._id;
        const mostUsedDeviceCount = deviceUsage[0].count;
        const totalDeviceCount = totalDevices[0].count;
        const score = (mostUsedDeviceCount / totalDeviceCount) * 100;

        return {
            MUdevice: mostUsedDevice,
            MUscore: score.toFixed(4),
        };
    } catch (error) {
        console.error("Error in getMostUsedDevice:", error);
        return {
            message: "Error in retrieving most used device",
            error: error.message,
        };
    }
}

async getMostUsedOS(userId) {
    try {
        const osUsage = await MetadataModel.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId) } },
            { $unwind: "$os" },
            { $group: { _id: "$os", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 1 },
        ]);

        const totalOS = await MetadataModel.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId) } },
            { $unwind: "$os" },
            { $group: { _id: null, count: { $sum: 1 } } },
        ]);

        if (osUsage.length === 0 || totalOS.length === 0) {
            return {
                message: "No OS data available",
                os: null,
                score: 0,
            };
        }

        const mostUsedOS = osUsage[0]._id;
        const mostUsedOSCount = osUsage[0].count;
        const totalOSCount = totalOS[0].count;
        const score = (mostUsedOSCount / totalOSCount) * 100;

        return {
            MUos: mostUsedOS,
            MUscore: score.toFixed(4),
        };
    } catch (error) {
        console.error("Error in getMostUsedOS:", error);
        return {
            message: "Error in retrieving most used OS",
            error: error.message,
        };
    }
}

async getMostUsedTxnPurpose(userId) {
    try {
        const txnPurposeUsage = await MetadataModel.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId) } },
            { $unwind: "$txn_purpose" },
            { $group: { _id: "$txn_purpose", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 1 },
        ]);

        const totalTxnPurpose = await MetadataModel.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId) } },
            { $unwind: "$txn_purpose" },
            { $group: { _id: null, count: { $sum: 1 } } },
        ]);

        if (txnPurposeUsage.length === 0 || totalTxnPurpose.length === 0) {
            return {
                message: "No transaction purpose data available",
                txnPurpose: null,
                score: 0,
            };
        }

        const mostUsedTxnPurpose = txnPurposeUsage[0]._id;
        const mostUsedTxnPurposeCount = txnPurposeUsage[0].count;
        const totalTxnPurposeCount = totalTxnPurpose[0].count;
        const score = (mostUsedTxnPurposeCount / totalTxnPurposeCount) * 100;

        return {
            MUtxnPurpose: mostUsedTxnPurpose,
            MUscore: score.toFixed(4),
        };
    } catch (error) {
        console.error("Error in getMostUsedTxnPurpose:", error);
        return {
            message: "Error in retrieving most used transaction purpose",
            error: error.message,
        };
    }
}

async getMostUsedAuthUsed(userId){
    try {
        const authUsage = await MetadataModel.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId) } },
            { $unwind: "$auth_used" },
            { $group: { _id: "$auth_used", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 1 },
        ]);

        const totalAuth = await MetadataModel.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId) } },
            { $unwind: "$auth_used" },
            { $group: { _id: null, count: { $sum: 1 } } },
        ]);

        if (authUsage.length === 0 || totalAuth.length === 0) {
            return {
                message: "No auth used data available",
                auth: null,
                score: 0,
            };
        }

        const mostUsedAuth = authUsage[0]._id;
        const mostUsedAuthCount = authUsage[0].count;
        const totalAuthCount = totalAuth[0].count;
        const score = (mostUsedAuthCount / totalAuthCount);

        return {
            MUauth: mostUsedAuth,
            MUscore: score.toFixed(4),
        };
    } catch (error) {
        console.error("Error in getMostUsedAuthUsed:", error);
        return {
            message: "Error in retrieving most used auth used",
            error: error.message,
        };
    }

}

async getTotalAmountCountMonthly(userId) {
    try {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;

        const result = await TransactionModel.aggregate([
            {
                $match: {
                    accountNumber: new mongoose.Types.ObjectId(userId),
                    year: currentYear,
                    month: currentMonth,
                },
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$amount" },
                    count: { $sum: 1 },
                },
            },
        ]);

        if (result.length === 0) {
            return {
                message: "No transaction data available for the current month",
                totalAmount: 0,
                count: 0,
            };
        }

        return {
            totalAmount: result[0].totalAmount,
            count: result[0].count,
        };
    } catch (error) {
        console.error("Error in getTotalAmountMonthly:", error);
        return {
            message: "Error in retrieving total amount and count for the current month",
            error: error.message,
        };
    }
}

async getMeanAmount(userId){
    try {
      const userMetadata = await MetadataModel.findOne({userId:userId})
      if(!userMetadata){
        return {
          message: "No login attempt data available",
          medianLoginAttempt: 0,
      };
      }
      const amountArr = userMetadata.amount;
      let amount = this.agg_svc.calculateAggregation(amountArr,"mean")
        return amount;
    } catch (error) {
        console.error("Error in getMeanAmount:", error);
        return {
            message: "Error in retrieving mean transaction amount",
            error: error.message,
        };
    }
}

async getMeanSessionLen(userId){
    try {
      const userMetadata = await MetadataModel.findOne({userId:userId})
      if(!userMetadata){
        return {
          message: "No login attempt data available",
          medianSessionLen: 0,
      };
      }
      const sessionLen = userMetadata.session_len;
      let medianSessionLen = this.agg_svc.calculateAggregation(sessionLen,"mean")
        return medianSessionLen;
    } catch (error) {
        console.error("Error in getMedianSessionLen:", error);
        return {
            message: "Error in retrieving median session length",
            error: error.message,
        };
    }
}

async getMedianDistanceMoved(userId){
  try {
    const userMetadata = await MetadataModel.findOne({userId:userId})
    if(!userMetadata){
      return {
        message: "No login attempt data available",
        median: 0,
    };
    }
    const distanceMoved = userMetadata.distance_moved;
    let median = this.agg_svc.calculateAggregation(distanceMoved,"median")

    return median;
} catch (error) {
    console.error("Error in getMedianDistanceMoved:", error);
    return {
        message: "Error in retrieving median distance moved",
        error: error.message,
    };
}
}

getMedianLoginAttempt = async (userId)=>{
  try {
    const userMetadata = await MetadataModel.findOne({userId:userId})
    if(!userMetadata){
      return {
        message: "No login attempt data available",
        medianLoginAttempt: 0,
    };
    }
    const loginAttempts = userMetadata.login_attempt;
    let median = this.agg_svc.calculateAggregation(loginAttempts,"median")
    return median;
} catch (error) {
    console.error("Error in getMedianLoginAttempt:", error);
    return {
        message: "Error in retrieving median login attempt",
        error: error.message,
    };
}

  }

  saveMetaData = async (from, user,data) => {
    try {
      let metadata = await MetadataModel.findOne({ userId: user._id });
      console.log("incomingdata",from,user,data)
      if (from ==="login") {
        let senderUser = await LoginDetailModel.findOne({userId:user._id})
        // console.log("senderUser",senderUser)
        let attempts = 5;
        if(senderUser){
          attempts = senderUser.attempts;
        }
        if (!metadata) {
          const obj = {
            userId: user._id,
            device: [data.Device_Used],
            os: [data.OS],
            distance_moved:[data.distanceMoved],
            auth_used:[data.auth_used],
            login_attempt: [attempts]
            // txn_purpose: [data.txn_purpose],
          };

          metadata = new MetadataModel(obj);
          // metadata = obj
        } else {
          metadata.device.push(data.Device_Used);
          metadata.os.push(data.OS);
          metadata.distance_moved.push(data.distanceMoved);
          metadata.auth_used.push(data.auth_used);
          metadata.login_attempt.push(attempts);
          //   metadata.txn_purpose.push(data.txn_purpose); // txn purpose chai transaction vayepaxi push garne
        }
      }
      else if(from==='txn'){
        if (!metadata) {
          const obj = {
            userId: user._id,
            txn_purpose: [data.txn_purpose],
            session_len: [data.session_len],
            amount: [data.amount],
          };

          metadata = new MetadataModel(obj);
          // metadata = obj
        } else {
          metadata.txn_purpose.push(data.txn_purpose);
          metadata.session_len.push(data.session_len);
          metadata.amount.push(data.amount);
          
        }
      }else{
        throw new Error('Metadata error saving form helper svc.')
      }

      // console.log(metadata);
      const savedMetadata = await metadata.save();
      console.log("Metadata saved successfully", savedMetadata);
    } catch (error) {
      console.error("Error saving metadata:", error);
    }
  };





}

module.exports = Helper;

