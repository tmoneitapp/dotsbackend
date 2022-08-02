var express = require('express');
var bodyParser = require('body-parser');
var authenticate = require('../services/authenticate');
var error = require('../shared/error');

var dropdown = require('../services/dropdown');

var dropdownRouter = express.Router();
dropdownRouter.use(bodyParser.json());

dropdownRouter.route('/')
.get(authenticate.authenticateToken, (req, res, next) =>{

})
.post(authenticate.authenticateToken, (req, res, next) =>{
    
})