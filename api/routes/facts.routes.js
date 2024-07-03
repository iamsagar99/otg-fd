const router = require("express").Router();
const FactsController= require("../app/controller/facts.controller.js");
const fact_ctrl = new FactsController();
const loginCheck = require("../app/middleware/auth.middleware.js")

router.get("/add",
    loginCheck,
    fact_ctrl.addFacts
);

module.exports = router;