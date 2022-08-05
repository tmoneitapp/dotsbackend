var express = require("express");
var bodyParser = require("body-parser");
var authenticate = require("../services/authenticate");
var error = require("../shared/error");

var order_sds = require("../services/order_sd");

var orderSdRouter = express.Router();
orderSdRouter.use(bodyParser.json());

orderSdRouter
  .route("/")
  .get(authenticate.authenticateToken, (req, res, next) => {
    if (req.query.order_id) {
      const order_id = req.query.order_id;
      order_sds
        .find({ order_id: order_id })
        .then(
          (order_sds) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(order_sds);
          },
          (err) => next(err)
        )
        .catch((err) => next(err));
    } else {
      order_sds
        .find({})
        .then(
          (order_sds) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(order_sds);
          },
          (err) => next(err)
        )
        .catch((err) => next(err));
    }
  })
  .post(authenticate.authenticateToken, (req, res, next) => {
    order_sds
      .create(req.body)
      .then(
        (order_sd) => {
          if (order_sd.message == error.RECORD_ERROR) {
            res.statusCode = 400;
            res.end();
          } else {
            res.statusCode = 201;
            res.setHeader("Content-Type", "application/json");
            res.json(order_sd);
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

orderSdRouter
  .route("/:uuid")
  .get(authenticate.authenticateToken, (req, res, next) => {
    order_sds
      .findById(req.params.uuid)
      .then(
        (order_sd) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(order_sd);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .put(authenticate.authenticate, (req, res, next) => {
    order_sds
      .findByIdAndUpdate(req.params.uuid, req.body)
      .then(
        (order_sd) => {
          if (order_sd.message == error.RECORD_ERROR) {
            res.statusCode = 400;
            res.end();
          } else {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(order_sd);
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .delete(authenticate.authenticateToken, (req, res, next) => {
    order_sds
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

module.exports = orderSdRouter;
