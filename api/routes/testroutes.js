const router = require("express").Router();
const CriteriaController = require("../app/controller/usercriteria.controller");
const cr_ctrl = new CriteriaController();

//post request
router.post("/", cr_ctrl.setUserCriteria);

module.exports = router;