const router = require("express").Router();
const FactsController= require("../app/controller/facts.controller.js");
const fact_ctrl = new FactsController();

router.post("/add",
    fact_ctrl.addFacts
);

module.exports = router;