const loginDetailModel = require('../models/loginDetail.model');
const UserModel = require('../models/user.model');
const AuthService = require('../services/auth.service');
const Helper = require('../services/helper.service')
const bcrypt = require('bcrypt');

class AuthController {
    constructor(){
        this.auth_svc = new AuthService();
        this.help_svc = new Helper()
    }
    
    login = async (req, res, next) => {
        try {
            // Validate incoming data
            let data = req.body;
            let errors = this.auth_svc.loginValidate(data);
            if (errors) {
                return res.status(400).json({
                    status: false,
                    msg: 'Validation Failed',
                    result: errors
                });
            }
    
            console.log("trying login");
            console.log(data.email, data.authValue);
            let user = await UserModel.findOne({ email: data.email }).populate({
                path: 'provider',
                select: 'name'
            });
    
            if (user) {
                // Cast data's lat and lon to number
                data.lat = parseFloat(data.lat);
                data.lon = parseFloat(data.lon);
    
                let userHistory = await loginDetailModel.findOne({ userId: user._id });
    
                let hLat = userHistory ? userHistory.latitude : data.lat || 0;
                let hLon = userHistory ? userHistory.longitude : data.lon || 0;
                let distanceMoved = this.help_svc.haversineDistance(data.lat || 0, data.lon || 0, hLat, hLon);
    
                console.log('DistanceMoved:', distanceMoved);
    
                let loginDetail = {
                    userId: user._id,
                    attempts: userHistory ? userHistory.attempts + 1 : 1,
                    latitude: data.lat || null,
                    longitude: data.lon || null,
                    device: data.device,
                    distanceMoved: parseFloat(distanceMoved),
                    os: data.os,
                    authUsed: data.auth_used || null,
                    timeStamp: new Date()
                };
    
                if (userHistory) {
                    await loginDetailModel.updateOne({ _id: userHistory._id }, loginDetail);
                    console.log('Login updated');
                } else {
                    await new loginDetailModel(loginDetail).save();
                    console.log('Login saved');
                }
    
                let isMatch = bcrypt.compareSync(data.authValue, user.password);
                if (isMatch) {
                    let access_token = this.auth_svc.generateAccessToken({
                        id: user._id,
                        email: user.email
                    });
                    return res.json({
                        result: {
                            user: user,
                            access_token: access_token
                        },
                        msg: 'Login successful',
                        status: true
                    });
                } else {
                    return res.status(401).json({
                        result: null,
                        status: false,
                        msg: 'Invalid credentials'
                    });
                }
            } else {
                return res.status(404).json({
                    result: null,
                    status: false,
                    msg: 'User not found'
                });
            }
        } catch (error) {
            console.log("LoginException:", error);
            next({
                status: error.status || 500,
                msg: error.msg || 'Something went wrong. Server error'
            });
        }
    };
    
//===============================================================================
    register = async (req,res,next)=>{
        let data = req.body
        
        try{
            let errors = this.auth_svc.registerValidate(data);
            if(errors){
                return {
                    status: false,
                    msg: 'Validation Failed',
                    result: errors
                }
            }
            
            else{
                data.accountNumber =  this.help_svc.generateRandomString()
                let doesAccountNumExist = true;

                while(doesAccountNumExist){
                    if(await UserModel.findOne({accountNumber:data.accountNumber})){
                        data.accountNumber = this.help_svc.generateRandomString()
                    }else{
                        doesAccountNumExist = false;
                    }
                }

                let hash = bcrypt.hashSync(data.authValue,10)
                data.authValue = hash;
                let message = [];
                let userexist = await UserModel.findOne({email:data.email})
                if(userexist){
                    message.push('User already exists')
                }
                let user = new UserModel(data)
                user.save()
                    .then((ack)=>{
                        message.push('User registered successfully')
                        let msg = message[0];
                        res.json({
                            result: user,
                            msg: msg,
                            status: true
                        })
                    })
                    .catch((err)=>{
                        console.log('RegisterError:',err)
                        next({
                            status: 500,
                            msg: 'Error registering user'
                        })
                    })
            }
        }
        catch(err){
            console.log('RegisterException:',err)
            next({
                status: err.status || 500,
                msg: err.msg || 'Something went wrong. Server error'
            })
        }
    }

    verifyUser = (req,res,next)=>{
        if(req.auth_user.expire){
            res.json({
                result: null,
                msg: 'Session Expired.',
                status: false
            })
        }
        if(req.auth_user){
            res.json({
                result: req.auth_user,
                msg: 'User Verified',
                status: true
            })
        }
        else{
            next({
                status: 401,
                msg: 'Unauthorized'
            })
        }
    }
}

module.exports = AuthController;