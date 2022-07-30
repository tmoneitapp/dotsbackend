var express = require('express');
var bodyParser = require('body-parser');
var authenticate = require('../services/authenticate');
var error = require('../shared/error');
var pms = require('../services/pm');

var pmRouter = express.Router();
pmRouter.use(bodyParser.json());

pmRouter.route('/')
.get(authenticate.authenticateToken, (req, res,next) => {
    pms.find()
    .then((pms) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(pms); 
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.authenticateToken, (req, res, next) =>{
    pms.create(req.body)
    .then((pm) =>{
        if(pm == error.RECORD_ERROR){
            res.statusCode=400;
            res.end();
        }
        else{
            res.statusCode =201;
            res.setHeader('Content-Type','application/json');
            res.json(pm);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

pmRouter.route('/:Id')
.get(authenticate.authenticateToken, (req, res, next) =>{
    pms.findById(req.params.Id)
    .then((pm) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(pm);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(authenticate.authenticateToken, (req, res, next) =>{
    pms.findByIdAndUpdate(req.params.Id, req.body)
    .then((pm) =>{
        if(pm ==error.RECORD_ERROR){
            res.statusCode=400;
            res.end();
        }
        else{
            res.statusCode =200;
            res.setHeader('Content-Type','application/json');
            res.json(pm);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = pmRouter;