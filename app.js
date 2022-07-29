var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var passport = require('passport');
var swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require('./swagger.json');

//import { swaggerDocument } from './swagger';


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var ordersRouter = require('./routes/orders');
var dashboardRouter = require('./routes/dashboard');


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

app.set('base','/api');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(passport.initialize());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/orders',ordersRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
