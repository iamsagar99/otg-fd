const InstitutionModel  = require('../models/provider.model')
const Helper = require('../services/helper.service')
const fs = require('fs');
class Institution{
    constructor(){
        this.help_svc = new Helper()
    }
    createProvider = async (req, res, next) => {
        try {
            let data = req.body;
            let al = await InstitutionModel.findOne({name:data.name})
            if(al){
                return res.json({
                    result: al,
                    status: false,
                    msg: "Institution already exists."
                })
            }
            let inst = new InstitutionModel(data);
            inst.save()
                .then((response) => {
                    res.json({
                        result: inst,
                        status: true,
                        msg: "Institution added successfully."
                    })
                })
                .catch((error) => {
                    next({
                        status: false,
                        msg: error
                    })
                })
        } catch (err) {
            next(err);
        }
    }
    getProviders = async (req,res,next) =>{
        try{
            let providers = await InstitutionModel.find()
            if(providers){
                res.json({
                    result: providers,
                    status: true,
                    msg: "Institutions found."
                })
            }else{
                res.json({
                    result: null,
                    status: false,
                    msg: "No institution found."
                })
            }
        }catch(err){
            next(err);
        }
    }

    getUserInfo = async (req, res, next) => {
        try {
            let output = await this.help_svc.getGeoStats(req);
            let deviceStat = await this.help_svc.getDeviceInfo(req);
            let responseJson = {
                user: req.query.name,
                result: output,
                deviceInfo: deviceStat
            };
    
            // Convert response JSON to string
            let responseString = JSON.stringify(responseJson) + '\n';
    
            // Append the response string to the text file
            fs.appendFile('responses.json', responseString, (err) => {
                if (err) {
                    console.error('Error writing to file', err);
                }
            });
    
            res.json(responseJson);
        } catch (error) {
            next(error);
        }
    };
}

module.exports = Institution;