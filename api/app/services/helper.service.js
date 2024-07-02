const axios = require('axios')
const useragent = require('express-useragent');
const crypto = require('crypto');
const UserModel = require('../models/user.model')
const MetadataModel = require('../models/metadatalog.model')
const TransactionModel = require('../models/transaction.model.js')


class Helper {
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

  getGeoStats = async (req)=>{
    try {
        let ip = req.ip === '::1' ? '127.0.0.1' : req.ip; // Handle localhost for testing
        // ip = '110.44.114.34'
        const url = `http://ip-api.com/json/${ip}`;
        const response = await axios.get(url);
        const geolocation = response.data;
        let geostat =  {
            url: req.url,
            method: req.method,
            headers: req.headers,
            body: req.body,
            ip: ip,
            geolocation: {
                latitude: geolocation.lat,
                longitude: geolocation.lon,
                city: geolocation.city,
                state: geolocation.state ?? 'N/A',
                region: geolocation.regionName,
                country: geolocation.country
            }
        }
        return geostat
    } catch (error) {
       throw error
    }
  }


  getDeviceInfo = async(req) =>{
    try {
        const userAgent = req.headers['user-agent'];
    
        const osRegex = /(Windows NT \d+\.\d+|Android \d+\.\d+|iOS \d+\_\d+_\d+|Mac OS X \d+\_\d+(\_\d+)?|Linux)/i;
        const deviceRegex = /(Mobile|Tablet|iPad|iPhone|Android|Windows|Linux)/i;
    
        const osMatch = userAgent.match(osRegex);
        const os = osMatch ? osMatch[0] : 'Unknown OS';
    
        const deviceMatch = userAgent.match(deviceRegex);
        const device = deviceMatch ? deviceMatch[0] : 'Unknown Device';
    
        let info = {
          device,os
        }
        return info;

      } catch (error) {
        throw error;
      }
  }

  haversineDistance(lat1, lon1, lat2, lon2) {
    const toRadians = (degrees) => degrees * (Math.PI / 180);

    lat1 = toRadians(lat1);
    lon1 = toRadians(lon1);
    lat2 = toRadians(lat2);
    lon2 = toRadians(lon2);

    const dlon = lon2 - lon1;
    const dlat = lat2 - lat1;

    const a = Math.sin(dlat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) ** 2;
    const c = 2 * Math.asin(Math.sqrt(a));

    const km = 6371 * c; // Radius of Earth in kilometers
    return km;
  }

  getAgeUser=async(userId)=>{
    let user = await UserModel.findOne({_id:userId})
    let dob = user.dob
    let age = new Date().getFullYear() - new Date(dob).getFullYear()
    return age
  }

  getMostUsedDevice = async (userId) => {
    try {
      // Extract user ID from request
  
      // Aggregate the device usage count for the specific user
      const deviceUsage = await MetadataModel.aggregate([
        { $match: { userId: mongoose.Types.ObjectId(userId) } },
        { $unwind: "$device" },
        { $group: { _id: "$device", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 1 }
      ]);
  
      // Get the total number of devices used by the specific user
      const totalDevices = await MetadataModel.aggregate([
        { $match: { userId: mongoose.Types.ObjectId(userId) } },
        { $unwind: "$device" },
        { $group: { _id: null, count: { $sum: 1 } } }
      ]);
  
      if (deviceUsage.length === 0 || totalDevices.length === 0) {
        return {
          message: "No device data available",
          device: null,
          score: 0
        };
      }
  
      const mostUsedDevice = deviceUsage[0]._id;
      const mostUsedDeviceCount = deviceUsage[0].count;
      const totalDeviceCount = totalDevices[0].count;
      const score = (mostUsedDeviceCount / totalDeviceCount) * 100;
  
      return {
        MUdevice: mostUsedDevice,
        MUscore: score.toFixed(4) // keeping score up to 4 decimal points
      };
    } catch (error) {
      console.error("Error in getMostUsedDevice:", error);
      return {
        message: "Error in retrieving most used device",
        error: error.message
      };
    }
  }

  getMostUsedOS = async (userId) => {
    try {
      // Extract user ID from request
  
      // Aggregate the OS usage count for the specific user
      const osUsage = await MetadataModel.aggregate([
        { $match: { userId: mongoose.Types.ObjectId(userId) } },
        { $unwind: "$os" },
        { $group: { _id: "$os", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 1 }
      ]);
  
      // Get the total number of OS used by the specific user
      const totalOS = await MetadataModel.aggregate([
        { $match: { userId: mongoose.Types.ObjectId(userId) } },
        { $unwind: "$os" },
        { $group: { _id: null, count: { $sum: 1 } } }
      ]);
  
      if (osUsage.length === 0 || totalOS.length === 0) {
        return {
          message: "No OS data available",
          os: null,
          score: 0
        };
      }
  
      const mostUsedOS = osUsage[0]._id;
      const mostUsedOSCount = osUsage[0].count;
      const totalOSCount = totalOS[0].count;
      const score = (mostUsedOSCount / totalOSCount) * 100;
  
      return {
        MUos: mostUsedOS,
        MUscore: score.toFixed(4) // keeping score up to 4 decimal points
      };
    } catch (error) {
      console.error("Error in getMostUsedOS:", error);
      return {
        message: "Error in retrieving most used OS",
        error: error.message
      };
    }
  }

  getMostUsedTxnPurpose = async (userId) => {
    try {

      // Aggregate the transaction purpose usage count for the specific user
      const txnPurposeUsage = await MetadataModel.aggregate([
        { $match: { userId: mongoose.Types.ObjectId(userId) } },
        { $unwind: "$txn_purpose" },
        { $group: { _id: "$txn_purpose", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 1 }
      ]);
  
      // Get the total number of transaction purposes used by the specific user
      const totalTxnPurpose = await MetadataModel.aggregate([
        { $match: { userId: mongoose.Types.ObjectId(userId) } },
        { $unwind: "$txn_purpose" },
        { $group: { _id: null, count: { $sum: 1 } } }
      ]);
  
      if (txnPurposeUsage.length === 0 || totalTxnPurpose.length === 0) {
        return {
          message: "No transaction purpose data available",
          txnPurpose: null,
          score: 0
        };
      }
  
      const mostUsedTxnPurpose = txnPurposeUsage[0]._id;
      const mostUsedTxnPurposeCount = txnPurposeUsage[0].count;
      const totalTxnPurposeCount = totalTxnPurpose[0].count;
      const score = (mostUsedTxnPurposeCount / totalTxnPurposeCount) * 100;
  
      return {
        MUtxnPurpose: mostUsedTxnPurpose,
        MUscore: score.toFixed(4) // keeping score up to 4 decimal points
      };
    } catch (error) {
      console.error("Error in getMostUsedTxnPurpose:", error);
      return {
        message: "Error in retrieving most used transaction purpose",
        error: error.message
      };
    }
  }

  getTotalAmountCountMonthly = async (userId) => {
    try {
      // Get the current date details
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1; // Month is 0-indexed in JavaScript
  
      // Aggregate the total amount and count for the current month
      const result = await TransactionModel.aggregate([
        { $match: { accountNumber: mongoose.Types.ObjectId(userId), year: currentYear, month: currentMonth } },
        { $group: { _id: null, totalAmount: { $sum: "$amount" }, count: { $sum: 1 } } }
      ]);
  
      if (result.length === 0) {
        return {
          message: "No transaction data available for the current month",
          totalAmount: 0,
          count: 0
        };
      }
  
      return {
        totalAmount: result[0].totalAmount,
        count: result[0].count
      };
    } catch (error) {
      console.error("Error in getTotalAmountMonthly:", error);
      return {
        message: "Error in retrieving total amount and count for the current month",
        error: error.message
      };
    }
  };







}

module.exports = Helper;