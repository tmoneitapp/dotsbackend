var express = require('express');
var bodyParser = require('body-parser');
var authenticate = require('../services/authenticate');
var error = require('../shared/error');

var roles = require('../services/roles');

var roleRouter = express.Router();
roleRouter.use(bodyParser.json());

roleRouter.route('/')
.get(authenticate.authenticateToken, (req, res, next) =>{
    if(req.query.name){
        const name = req.query.name;
        roles.find({'name':name})
        .then((roles) => {
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(roles);
        }, (err) => next(err))
        .catch((err) => next(err));
    }
    else{
        roles.find({})
        .then((roles) =>{
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(roles);
        }, (err) => next(err))
        .catch((err) => next(err));
    }
})
.post(authenticate.authenticateToken, (req, res, next) =>{
    roles.create(req.body)
    .then((role) =>{
        if(role.message == error.RECORD_ERROR){
            res.statusCode=400;
            res.end();
        }
        else{
            res.statusCode=201;
            res.setHeader('Content-Type','application/json');
            res.json(role);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

roleRouter.route('/:uuid')
.get(authenticate.authenticateToken, (req, res, next) =>{
    roles.findById(req.params.uuid)
    .then((role) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(role);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(authenticate.authenticateToken, (req, res, next) => {
    roles.findByIdAndUpdate(req.params.uuid, req.body)
    .then((role) =>{    
        if(role.message == error.RECORD_ERROR){
            res.statusCode=400;
            res.end();
        }
        else{
            res.statusCode =200;
            res.setHeader('Content-Type','application/json');
            res.json(role);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(authenticate.authenticateToken, (req, res, next) =>{
    roles.findByIdAndRemove(req.params.uuid)
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

module.exports = roleRouter;