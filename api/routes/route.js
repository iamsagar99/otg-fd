const express = require("express");
const app = express();

const auth_routes = require('./auth.routes.js')
const provider_routes = require('./institution.routes.js')
const user_routes = require("./user.routes");
const criteria_routes = require('./criteria.routes.js')
const facts_routes = require('./facts.routes.js')
const txn_routes = require('./transaction.routes.js')
app.use('/user', user_routes);
// app.use('/election', election_routes);
app.use('/txn', txn_routes);
app.use('/facts', facts_routes);
app.use('/provider',provider_routes)
app.use('/auth',auth_routes); 
app.use('/criteria',criteria_routes)

module.exports = app;