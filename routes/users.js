var express = require('express');
var router = express.Router();
var users = require('../services/users');
var authenticate = require('../services/authenticate');
var bcrypt = require('bcryptjs');
var error = require('../shared/error');

/* GET users listing. */
router.get('/', authenticate.authenticateToken, (req, res, next) =>{
  users.getMultiple()
  .then((result) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.json(result); 
  }, (err) => next(err))
  .catch((err) => next(err));
});

router.get('/:userId', authenticate.authenticateToken, (req, res, next) =>{
  users.findByUserId(req.params.userId)
  .then((user) =>{
    if(user == error.RECORD_EMPTY){
      res.statusCode =200;
      res.setHeader('Content-Type','application/json');
      res.json({success:false, status: error.RECORD_EMPTY});
    }
    else{
      res.statusCode =200;
      res.setHeader('Content-Type','application/json');
      res.json(user);
    }
  }, (err) => next(err))
  .catch((err) => next(err));
});

router.get('/profile', authenticate.authenticateToken, (req, res, next) =>{
  users.findByUserId(res.locals._id)
  .then((user) =>{
    if(user == error.RECORD_EMPTY){
      res.statusCode =200;
      res.setHeader('Content-Type','application/json');
      res.json({success:false, status: error.RECORD_EMPTY});
    }
    else{
      res.statusCode =200;
      res.setHeader('Content-Type','application/json');
      res.json(user);
    }
  }, (err) => next(err))
  .catch((err) => next(err));
  //console.log(res.locals);
})

router.post('/login', (req,res,next) =>{
  users.getLogin(req.body.username, req.body.password)
  .then((user) =>{
    console.log(user);
      if(user == error.USER_INVALID_PASSWORD){
        res.statusCode =200;
        res.setHeader('Content-Type','application/json');
        res.json({success:false, status: error.USER_INVALID_PASSWORD});
      }
      else if(user == error.USER_INVALID_USERNAME){
        res.statusCode =200;
        res.setHeader('Content-Type','application/json');
        res.json({success:false, status: error.USER_INVALID_USERNAME});
      }
      else {
        // console.log(user.username);
        // console.log(user[0].username);
        var token = authenticate.getToken({ _id: user[0].userid});
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json({success:true, token: token, status: 'You are successfully logged in'});
      }
    
  }, (err) => next(err))
  .catch((err) => next(err));
});

router.get('/logout', (req,res,next) =>{
  req.session.destroy();
  req.clearCookie('session-id');
  req.redirect('/');
  // if(req.session){
  //   req.session.destroy();
  //   req.clearCookie('session-id');
  //   req.redirect('/');
  // }
  // else {
  //   var err = new Error('You are not logged in!');
  //   err.status = 403;
  //   next(err);
  // }
});

module.exports = router;
