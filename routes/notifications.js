var express = require("express");
var bodyParser = require("body-parser");
var authenticate = require("../services/authenticate");
var error = require("../shared/error");

var notifications = require("../services/notifications");

var notificationRouter = express.Router();
notificationRouter.use(bodyParser.json());

notificationRouter
  .route("/")
  .get(authenticate.authenticateToken, (req, res, next) => {
    if (req.query.user_id) {
      const user_id = req.query.user_id;
      notifications
        .find({ user_id: user_id })
        .then(
          (notifications) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(notifications);
          },
          (err) => next(err)
        )
        .catch((err) => next(err));
    } else {
      notifications
        .find({})
        .then(
          (notifications) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(notifications);
          },
          (err) => next(err)
        )
        .catch((err) => next(err));
    }
  })
  .post(authenticate.authenticateToken, (req, res, next) => {
    notifications
      .create(req.body)
      .then(
        (notification) => {
          if (notification.message == error.RECORD_ERROR) {
            res.statusCode = 400;
            res.end();
          } else {
            res.statusCode = 201;
            res.setHeader("Content-Type", "application/json");
            res.json(notification);
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

notificationRouter
  .route("/:uuid")
  .get(authenticate.authenticateToken, (req, res, next) => {
    notifications
      .findById(req.params.uuid)
      .then(
        (notification) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(notification);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .put(authenticate.authenticateToken, (req, res, next) => {
    notifications
      .findByIdAndUpdate(req.params.uuid, req.body)
      .then(
        (notification) => {
          if (notification.message == error.RECORD_ERROR) {
            res.statusCode = 400;
            res.end();
          } else {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(notification);
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .delete(authenticate.authenticateToken, (req, res, next) => {
    notifications
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

module.exports = notificationRouter;
