const router = require("express").Router();
const TransactionController = require("../app/controller/transaction.controller.js");
const checkCriteria = require("../app/middleware/txn.middleware.js");  // Ensure this path is correct
const loginCheck = require("../app/middleware/auth.middleware.js")
const txn_ctrl = new TransactionController();

// Post request with checkCriteria middleware
router.post("/add",loginCheck, checkCriteria, txn_ctrl.addTransaction);
router.get("/fetchtxn/:txnId",loginCheck,txn_ctrl.getTransactionByTxnId)
router.get('/fetchalltxn',loginCheck,txn_ctrl.getAllTransactions)
router.get('/getusertxn/:userId',loginCheck,txn_ctrl.getTransactionOfUser)
router.put('/update/:txnId',loginCheck,txn_ctrl.updateTransaction)
router.get("/all",loginCheck,txn_ctrl.getAllTransactions)

module.exports = router;
