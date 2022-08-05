var express = require('express');
var bodyParser = require('body-parser');
var authenticate = require('../services/authenticate');
var error = require('../shared/error');

var resources = require('../services/resources');

var resourceRouter = express.Router();
resourceRouter.use(bodyParser.json());

resourceRouter.route('/')
.get(authenticate.authenticateToken, (req, res, next) =>{
    if(req.query.group){
        const group = req.query.group;
        resources.find({'group':group})
        .then((resources) => {
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(resources);
        }, (err) => next(err))
        .catch((err) => next(err));
    }
    else{
        resources.find({})
        .then((resources) =>{
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(resources);
        }, (err) => next(err))
        .catch((err) => next(err));
    }
})
.post(authenticate.authenticateToken, (req, res, next) =>{
    resources.create(req.body)
    .then((resource) =>{
        if(resource.message == error.RECORD_ERROR){
            res.statusCode=400;
            res.end();
        }
        else{
            res.statusCode=201;
            res.setHeader('Content-Type','application/json');
            res.json(resource);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

resourceRouter.route('/:uuid')
.get(authenticate.authenticateToken, (req, res, next) =>{
    resources.findById(req.params.uuid)
    .then((resource) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(resource);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(authenticate.authenticateToken, (req, res, next) =>{
    resources.findByIdAndUpdate(req.params.uuid, req.body)
    .then((resource) =>{    
        if(resource.message == error.RECORD_ERROR){
            res.statusCode=400;
            res.end();
        }
        else{
            res.statusCode =200;
            res.setHeader('Content-Type','application/json');
            res.json(resource);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(authenticate.authenticateToken, (req, res, next) =>{
    resources.findByIdAndRemove(req.params.uuid)
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

module.exports = resourceRouter;