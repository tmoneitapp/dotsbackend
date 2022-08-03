var express = require('express');
var bodyParser = require('body-parser');
var authenticate = require('../services/authenticate');
var error = require('../shared/error');

var dropdowns = require('../services/dropdown');

var dropdownRouter = express.Router();
dropdownRouter.use(bodyParser.json());

dropdownRouter.route('/')
.get(authenticate.authenticateToken, (req, res, next) =>{
    // If API been called with filter /?type=ORDER_TYPE
    if(req.query.type){
        const type = req.query.type;
        dropdowns.find({'type': type})
        .then((dropdowns) =>{
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(dropdowns);
        }, (err) => next(err))
        .catch((err) => next(err));
    }
    else{
        dropdowns.find({})
        .then((dropdowns) => {
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(dropdowns);
        }, (err) => next(err))
        .catch((err) => next(err));
    }
})
.post(authenticate.authenticateToken, (req, res, next) =>{
    dropdowns.create(req.body)
    .then((dropdown) =>{
        console.log(dropdown);
        if(dropdown.message == error.RECORD_ERROR){
            res.statusCode=400;
            res.end();
        }
        else{
            res.statusCode=201;
            res.setHeader('Content-Type','application/json');
            res.json(dropdown);
        }
        
    }, (err) => next(err))
    .catch((err) => next(err));
});

dropdownRouter.route('/:uuid')
.get(authenticate.authenticateToken, (req, res, next) =>{
    dropdowns.findById(req.params.uuid)
    .then((dropdown) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(dropdown);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(authenticate.authenticateToken, (req, res, next) =>{
    dropdowns.findByIdAndUpdate(req.params.uuid, req.body)
    .then((dropdown) =>{    
        if(dropdown.message == error.RECORD_ERROR){
            res.statusCode=400;
            res.end();
        }
        else{
            res.statusCode =200;
            res.setHeader('Content-Type','application/json');
            res.json(dropdown);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(authenticate.authenticateToken, (req, res, next) =>{

});

module.exports = dropdownRouter;