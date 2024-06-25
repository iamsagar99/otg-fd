const router = require("express").Router();
const AuthController= require("../app/controller/provider.controller");
const loginCheck = require("../app/middleware/auth.middleware");
const inst_ctrl = new AuthController();

router.post("/", inst_ctrl.createProvider);
router.get('/', inst_ctrl.getProviders)
router.get('/testinfo',inst_ctrl.getUserInfo)

module.exports = router;