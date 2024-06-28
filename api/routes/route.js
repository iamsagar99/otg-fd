const express = require("express");
const app = express();

const auth_routes = require('./auth.routes.js')
const provider_routes = require('./institution.routes.js')
const user_routes = require("./user.routes");
const criteria_routes = require('./testroutes.js')

app.use('/user', user_routes);
// app.use('/election', election_routes);
// app.use('/candidate', candidate_routes);
// app.use('/vote', vote_routes);
app.use('/provider',provider_routes)
app.use('/auth',auth_routes); 
app.use('/criteria',criteria_routes)

module.exports = app;