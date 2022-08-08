var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var passport = require("passport");

//import { swaggerDocument } from './swagger';

var app = express();
app.use(cors());
// app.all('*', (req, res, next) =>{
//   if (req.secure){
//     return next();
//   }
//   else {
//     res.redirect(307, 'https://' + req.hostname + req.url);
//   }
// });

app.set("base", "/api");
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(passport.initialize());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

var indexRouter = require("./routes/index");
app.use("/api", indexRouter);

var usersRouter = require("./routes/users");
app.use("/api/users", usersRouter);

var ordersRouter = require("./routes/orders");
app.use("/api/orders", ordersRouter);

var dashboardRouter = require("./routes/dashboard");
app.use("/api/dashboard", dashboardRouter);

// TODO: remove after stable
var cdyRouter = require("./routes/cdy");
app.use("/api/cdys", cdyRouter);

var pmRouter = require("./routes/pm");
app.use("/api/pms", pmRouter);
// TODO: end

var orderTypeRouter = require("./routes/ordertype");
app.use("/api/ordertypes", orderTypeRouter);

var productTypeRouter = require("./routes/producttype");
app.use("/api/producttypes", productTypeRouter);

var dropDownRouter = require("./routes/dropdown");
app.use("/api/dropdown", dropDownRouter);

var authorityRouter = require("./routes/authority");
app.use("/api/authorities", authorityRouter);

var roleRouter = require("./routes/roles");
app.use("/api/roles", roleRouter);

var resourceRouter = require("./routes/resources");
app.use("/api/resources", resourceRouter);

var orderSdRouter = require("./routes/order_sd");
app.use("/api/order_sd", orderSdRouter);

var swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require("./swagger.json");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
