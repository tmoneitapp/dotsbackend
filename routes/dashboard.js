var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var orders = require('../services/orders');
var authenticate = require('../services/authenticate');
var error = require('../shared/error');

var dashboardRouter = express.Router();
dashboardRouter.use(bodyParser.json());

dashboardRouter.get('/', authenticate.authenticateToken, (req, res, next) =>{
    //res.sendStatus(403);
    res.statusCode = 403;
    res.setHeader('Content-Type','application/json');
    //res.end(password_hash);
    res.end('no result return');
});

module.exports = dashboardRouter;


