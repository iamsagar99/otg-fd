const InstitutionModel  = require('../models/provider.model')
class Institution{
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
}

module.exports = Institution;