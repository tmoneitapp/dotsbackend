var express = require('express');
var bodyParser = require('body-parser');
var authenticate = require('../services/authenticate');
var error = require('../shared/error');

var authoritys = require('../services/authority');

var authorityRouter = express.Router();
authorityRouter.use(bodyParser.json());

authorityRouter.route('/')
.get(authenticate.authenticateToken, (req, res, next) =>{
    //If API been called with fileter /?identifier=order
    if(req.query.identifier){
        const indentifier = req.query.indentifier;
        authoritys.find({'identifier':identifier})
        .then((authoritys) =>{
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(authoritys);
        }, (err) => next(err))
        .catch((err) => next(err));
    }
    else{
        authoritys.find({})
        .then((authoritys) =>{
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(authoritys);
        }, (err) => next(err))
        .catch((err) => next(err));
    }
})
.post(authenticate.authenticateToken, (req, res, next) =>{
    authoritys.create(req.body)
    .then((authority) =>{
        if(authority.message == error.RECORD_ERROR){
            res.statusCode=400;
            res.end();
        }
        else{
            res.statusCode=201;
            res.setHeader('Content-Type','application/json');
            res.json(authority);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

authorityRouter.route('/:uuid')
.get(authenticate.authenticateToken, (req, res, next) =>{
    authoritys.findById(req.params.uuid)
    .then((authority) => {
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(authority);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(authenticate.authenticateToken, (req, res, next) =>{
    authoritys.findByIdAndUpdate(req.params.uuid, req.body)
    .then((authority) =>{
        if(authority.message == error.RECORD_ERROR){
            res.statusCode=400;
            res.end();
        }
        else{
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(authority);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(authenticate.authenticateToken, (req, res, next) =>{
    authoritys.findByIdAndRemove(req.params.uuid)
    .then((resp) => {
        if(resp.message == error.RECORD_ERROR){
            res.statusCode=400;
            res.end();
        }
        else{
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(resp);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = authorityRouter;