var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
var orders = require("../services/orders");
var authenticate = require("../services/authenticate");
var error = require("../shared/error");
