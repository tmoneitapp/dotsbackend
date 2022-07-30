var express = require('express');
var bodyParser = require('body-parser');
var authenticate = require('../services/authenticate');
var error = require('../shared/error');
var productTypes = require('../services/producttype');

var productTypeRouter = express.Router();
productTypeRouter.use(bodyParser.json());

productTypeRouter.route('/')
.get(authenticate.authenticateToken, (req, res,next) => {
    productTypes.find()
    .then((productTypes) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(productTypes); 
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.authenticateToken, (req, res, next) =>{
    productTypes.create(req.body)
    .then((productType) =>{
        if(productType == error.RECORD_ERROR){
            res.statusCode=400;
            res.end();
        }
        else{
            res.statusCode =201;
            res.setHeader('Content-Type','application/json');
            res.json(productType);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

productTypeRouter.route('/:Id')
.get(authenticate.authenticateToken, (req, res, next) =>{
    productTypes.findById(req.params.Id)
    .then((productType) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(productType);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(authenticate.authenticateToken, (req, res, next) =>{
    productTypes.findByIdAndUpdate(req.params.Id, req.body)
    .then((productType) =>{
        if(productType ==error.RECORD_ERROR){
            res.statusCode=400;
            res.end();
        }
        else{
            res.statusCode =200;
            res.setHeader('Content-Type','application/json');
            res.json(productType);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = productTypeRouter;