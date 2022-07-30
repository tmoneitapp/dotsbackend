var express = require('express');
var bodyParser = require('body-parser');
var authenticate = require('../services/authenticate');
var error = require('../shared/error');
var orderTypes = require('../services/ordertype');

var orderTypeRouter = express.Router();
orderTypeRouter.use(bodyParser.json());

orderTypeRouter.route('/')
.get(authenticate.authenticateToken, (req, res,next) => {
    orderTypes.find()
    .then((orderTypes) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(orderTypes); 
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.authenticateToken, (req, res, next) =>{
    orderTypes.create(req.body)
    .then((orderType) =>{
        if(orderType == error.RECORD_ERROR){
            res.statusCode=400;
            res.end();
        }
        else{
            res.statusCode =201;
            res.setHeader('Content-Type','application/json');
            res.json(orderType);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

orderTypeRouter.route('/:Id')
.get(authenticate.authenticateToken, (req, res, next) =>{
    orderTypes.findById(req.params.Id)
    .then((orderType) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(orderType);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(authenticate.authenticateToken, (req, res, next) =>{
    orderTypes.findByIdAndUpdate(req.params.Id, req.body)
    .then((orderType) =>{
        if(orderType ==error.RECORD_ERROR){
            res.statusCode=400;
            res.end();
        }
        else{
            res.statusCode =200;
            res.setHeader('Content-Type','application/json');
            res.json(orderType);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = orderTypeRouter;