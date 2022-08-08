var express = require("express");
var bodyParser = require("body-parser");
var authenticate = require("../services/authenticate");
var error = require("../shared/error");

var order_isoms = require("../services/order_isom");

var orderIsomRouter = express.Router();
orderIsomRouter.use(bodyParser.json());

orderIsomRouter
  .route("/")
  .get(authenticate.authenticateToken, (req, res, next) => {
    if (req.query.order_id) {
      const order_id = req.query.order_id;
      order_isoms
        .find({ order_id: order_id })
        .then(
          (order_isoms) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(order_isoms);
          },
          (err) => next(err)
        )
        .catch((err) => next(err));
    } else {
      order_isoms
        .find({})
        .then(
          (order_isoms) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(order_isoms);
          },
          (err) => next(err)
        )
        .catch((err) => next(err));
    }
  })
  .post(authenticate.authenticateToken, (req, res, next) => {
    order_isoms
      .create(req.body)
      .then(
        (order_isom) => {
          if (order_isom.message == error.RECORD_ERROR) {
            res.statusCode = 400;
            res.end();
          } else {
            res.statusCode = 201;
            res.setHeader("Content-Type", "application/json");
            res.json(order_isom);
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

orderIsomRouter
  .route("/:uuid")
  .get(authenticate.authenticateToken, (req, res, next) => {
    order_isoms
      .findById(req.params.uuid)
      .then(
        (order_isom) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(order_isom);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .put(authenticate.authenticateToken, (req, res, next) => {
    order_isoms
      .findByIdAndUpdate(req.params.uuid, req.body)
      .then(
        (order_isom) => {
          if (order_isom.message == error.RECORD_ERROR) {
            res.statusCode = 400;
            res.end();
          } else {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(order_isom);
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .delete(authenticate.authenticateToken, (req, res, next) => {
    order_isoms
      .findByIdAndRemove(req.params.uuid)
      .then(
        (resp) => {
          if (resp.message == error.RECORD_ERROR) {
            res.statusCode = 400;
            res.end();
          } else {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(resp);
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

module.exports = orderIsomRouter;
