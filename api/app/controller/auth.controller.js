const LoginDetailModel = require("../models/loginDetail.model");
const UserModel = require("../models/user.model");
const MetadataModel = require("../models/metadatalog.model");
const AuthService = require("../services/auth.service");
const Helper = require("../services/helper.service");
const bcrypt = require("bcrypt");

class AuthController {
  constructor() {
    this.auth_svc = new AuthService();
    this.help_svc = new Helper();
  }

  login = async (req, res, next) => {
    try {
      // Validate incoming data
      let data = req.body;
      let errors = this.auth_svc.loginValidate(data);
      if (errors) {
        return res.status(400).json({
          status: false,
          msg: "Validation Failed",
          result: errors,
        });
      }

      console.log("trying login");
      console.log(data.email, data.authValue);
      let user = await UserModel.findOne({ email: data.email }).populate({
        path: "provider",
        select: "name",
      });

      if (user) {
        // put data in login schema if user is present
        data.lat = parseFloat(data.lat);
        data.lon = parseFloat(data.lon);

        let userHistory = await LoginDetailModel.findOne({ userId: user._id });

        let hLat = userHistory ? userHistory.latitude : data.lat || 0;
        let hLon = userHistory ? userHistory.longitude : data.lon || 0;
        let distanceMoved = this.help_svc.haversineDistance(
          data.lat || 0,
          data.lon || 0,
          hLat,
          hLon
        );

        console.log("DistanceMoved:", distanceMoved);
        // console.log(userHistory)
        let loginDetail = {
          userId: user._id,
          attempts: userHistory ? userHistory.attempts + 1 : 1,
          latitude: data.lat || null,
          longitude: data.lon || null,
          device: data.Device_Used,
          distanceMoved: parseFloat(distanceMoved),
          os: data.OS,
          authUsed: data.auth_used || null,
          timeStamp: new Date(),
        };

        if (userHistory) {
          let updatedRes = await LoginDetailModel.updateOne(
            { _id: userHistory._id },
            loginDetail
          );
          console.log("Login updated",updatedRes);
        } else {
          await new LoginDetailModel(loginDetail).save();
          console.log("Login saved");
        }

        // login matched? if matched then also add it to metadatalog
        console.log("data",data)
        console.log("user",user)
        let isMatch = bcrypt.compareSync(data.authValue, user.password);
        if (isMatch) {
          let access_token = this.auth_svc.generateAccessToken({
            id: user._id,
            email: user.email,
          });
          //saving metadata
          try {
            let metadata = await MetadataModel.findOne({ userId: user._id });
            
            if (!metadata) {
              const obj = {
                userId: user._id,
                device: [data.Device_Used],
                os: [data.OS],
                // txn_purpose: [data.txn_purpose],
              };

              metadata = new MetadataModel(obj);
            // metadata = obj
            } else {
              metadata.device.push(data.Device_Used);
              metadata.os.push(data.OS);
            //   metadata.txn_purpose.push(data.txn_purpose); // txn purpose chai transaction vayepaxi push garne
            }
            console.log(metadata)
            const savedMetadata = await metadata.save();
            console.log("Metadata saved successfully", savedMetadata);
          } catch (error) {
            console.error("Error saving metadata:", error);
          }
          // login obj return
          return res.json({
            result: {
              user: user,
              access_token: access_token,
            },
            msg: "Login successful",
            status: true,
          });
        } else {
          return res.status(401).json({
            result: null,
            status: false,
            msg: "Invalid credentials",
          });
        }
      } else {
        return res.status(404).json({
          result: null,
          status: false,
          msg: "User not found",
        });
      }
    } catch (error) {
      console.log("LoginException:", error);
      next({
        status: error.status || 500,
        msg: error.msg || "Something went wrong. Server error",
      });
    }
  };

  //===============================================================================
  register = async (req, res, next) => {
    let data = req.body;
    console.log('chkp1',data)
    try {
      let errors = this.auth_svc.registerValidate(data);
      if (errors) {
        console.log('chkp2',errors)

        return {
          status: false,
          msg: "Validation Failed",
          result: errors,
        };
      } else {
        console.log('chkp3')

        data.accountNumber = this.help_svc.generateRandomString();
        let doesAccountNumExist = true;

        while (doesAccountNumExist) {
          console.log('chkp4')

          if (await UserModel.findOne({ accountNumber: data.accountNumber })) {
            console.log('chkp5')

            data.accountNumber = this.help_svc.generateRandomString();
          } else {
            console.log('chkp6')

            doesAccountNumExist = false;
          }
        }

        let hash = bcrypt.hashSync(data.password, 10);
        data.authValue = hash;
        let message = [];
        let userexist = await UserModel.findOne({ email: data.email });
        if (userexist) {
          console.log('chkp7')

          message.push("User already exists");
        }
        let user = new UserModel(data);
        user
          .save()
          .then((ack) => {
            console.log('chkp8')

            message.push("User registered successfully");
            let msg = message[0];
            res.json({
              result: user,
              msg: msg,
              status: true,
            });
          })
          .catch((err) => {
            console.log("RegisterError:", err);
            next({
              status: 500,
              msg: "Error registering user",
            });
          });
      }
    } catch (err) {
      console.log("RegisterException:", err);
      next({
        status: err.status || 500,
        msg: err.msg || "Something went wrong. Server error",
      });
    }
  };

  verifyUser = (req, res, next) => {
    if (req.auth_user.expire) {
      res.json({
        result: null,
        msg: "Session Expired.",
        status: false,
      });
    }
    if (req.auth_user) {
      res.json({
        result: req.auth_user,
        msg: "User Verified",
        status: true,
      });
    } else {
      next({
        status: 401,
        msg: "Unauthorized",
      });
    }
  };
}

module.exports = AuthController;
