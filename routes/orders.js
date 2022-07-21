var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var orders = require('../services/orders');
var authenticate = require('../services/authenticate');
var error = require('../shared/error');

var orderRouter = express.Router();
orderRouter.use(bodyParser.json());

orderRouter.route('/')
.get(authenticate.authenticateToken, (req, res, next) =>{
    orders.getMultiple()
    .then((orders) =>{
        console.log(orders);
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(orders); 
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.authenticateToken, (req, res, next) =>{
    orders.create(req.body)
    .then((order) =>{
        console.log('Order Created', order);
        res.statusCode =200;
        res.setHeader('Content-Type','application/json');
        res.json(order);
    })
    .catch((err) => next(err));
})
.put((req, res, next) =>{
    res.statusCode = 403;
    res.end('PUT operation not supported on /orders');
})
.delete((req, res, next) =>{
    res.statusCode = 403;
    res.end('DELETE operation not ready on /orders');
});

orderRouter.route('/:orderId')
.get((req, res, next) =>{
    res.statusCode = 403;
    res.end('GET operation not ready on /orders');
})
.post((req, res, next) =>{
    res.statusCode = 403;
    res.end('POST operation not ready on /orders');
})
.put((req, res, next) =>{
    res.statusCode = 403;
    res.end('PUT operation not supported on /orders');
})
.delete((req, res, next) =>{
    res.statusCode = 403;
    res.end('DELETE operation not ready on /orders');
});

module.exports = orderRouter;