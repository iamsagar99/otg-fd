const router = require("express").Router();
const createTransactionLimits = require("../app/controller/usercriteria.controller");
const cr_ctrl = new createTransactionLimits();

//post request
router.post("/", cr_ctrl.createTransactionLimits
    
);

module.exports = router;