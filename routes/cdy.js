var express = require('express');
var bodyParser = require('body-parser');
var authenticate = require('../services/authenticate');
var error = require('../shared/error');
var cdys = require('../services/cdy');

var cdyRouter = express.Router();
cdyRouter.use(bodyParser.json());

cdyRouter.route('/')
.get(authenticate.authenticateToken, (req, res,next) => {
    cdys.find()
    .then((cdys) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(cdys); 
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.authenticateToken, (req, res, next) =>{
    cdys.create(req.body)
    .then((cdy) =>{
        if(cdy == error.RECORD_ERROR){
            res.statusCode=400;
            res.end();
        }
        else{
            res.statusCode =201;
            res.setHeader('Content-Type','application/json');
            res.json(cdy);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

cdyRouter.route('/:Id')
.get(authenticate.authenticateToken, (req, res, next) =>{
    cdys.findById(req.params.Id)
    .then((cdy) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(cdy);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(authenticate.authenticateToken, (req, res, next) =>{
    cdys.findByIdAndUpdate(req.params.Id, req.body)
    .then((cdy) =>{
        if(cdy ==error.RECORD_ERROR){
            res.statusCode=400;
            res.end();
        }
        else{
            res.statusCode =200;
            res.setHeader('Content-Type','application/json');
            res.json(cdy);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = cdyRouter;