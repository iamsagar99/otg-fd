const UserModel = require("../models/user.model");
const AuthService =  require("../services/auth.service");
class UserController{
        constructor(){
            this.auth_svc = new AuthService();
        }
    
    getAllUsers = async (req, res, next) => {
        try {
            let filters = {}
        if(req.query.role && req.query.role!=="all"){
            filters ={
                role: req.query.role
            }
        }
        
        let data = await UserModel.find(filters).populate('')
        res.json({
            result: data,
            msg: "Fetched users",
            status: true
        })
        } catch (error) {
            next(error)
        }
    }

    updateUserById = async (req, res, next) => {
        let data = req.body;
        // console.log("data-req",data)
        if(req.file) { // req.files
            // 
            data.image = req.file.filename
        }
        try{
           
                let ack = await UserModel.findByIdAndUpdate(req.params.id, {
                    $set: data
                })
                res.json({
                    status: true,
                    msg: "User Updated successuflly.",
                    result: ack
                })
                
            
            
        } catch(error) {
            next({
                status: 400,
                msg: error
            })
        }
    }

    deleteUserById = async (req, res, next) => {
        try{
            let data = await UserModel.findById(req.params.id);
            if(data){
                let img = data.image;
                let role = data.role;
                if(img) {
                    path = process.cwd()+"/uploads/"+role+"/"+img;
                    fs.unlinkSync(path, img)
                }
                let ack = await UserModel.findByIdAndDelete(req.params.id);
                
                res.json({
                    result: data,
                    msg: "User deleted successfully.",
                    status: true
                })
            } else {
                next({
                    status: 400,
                    msg: "User Not found."
                })
            }
            
        } catch(e) {
            next({
                status: 500,
                msg: e
            })
        }
    }
    
    getUserById = async (req, res, next) => {
        try{
            let result = await UserModel.findById(req.params.id)
            if(result){
                res.json({
                    result:result,
                    msg:"User Fetched By Id",
                    status:true
                })
            }else(
                next({
                    status: 404,
                    msg:"User not found"
                })
            )
        }catch(error){
            next(error)
        }
    }
    
}

module.exports = UserController;