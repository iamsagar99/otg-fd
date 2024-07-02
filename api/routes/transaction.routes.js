const router = require("express").Router();
const TransactionController = require("../app/controller/transaction.controller.js");
const txn_ctrl = new TransactionController();

//post request
router.post("/add",txn_ctrl.addTransaction);

module.exports = router;