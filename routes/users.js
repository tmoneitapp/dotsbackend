var express = require('express');
var router = express.Router();
var users = require('../services/users');
var authenticate = require('../services/authenticate');
var bcrypt = require('bcryptjs');
var error = require('../shared/error');
var refreshTokens = {};
var jwt = require('jsonwebtoken');
var config = require('../config');

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

// router.get('/:userId', authenticate.authenticateToken, (req, res, next) =>{
//   users.findByUserId(req.params.userId)
//   .then((user) =>{
//     if(user == error.RECORD_EMPTY){
//       res.statusCode = 400;
//       res.end();
//       // res.statusCode =200;
//       // res.setHeader('Content-Type','application/json');
//       // res.json({success:false, status: error.RECORD_EMPTY});
//     }
//     else{
//       res.statusCode =200;
//       res.setHeader('Content-Type','application/json');
//       res.json(user);
//     }
//   }, (err) => next(err))
//   .catch((err) => next(err));
// });

router.get('/profile2', authenticate.authenticateToken, (req, res, next) =>{
  console.log(res.locals);
  users.findByUserId(res.locals._id)
  .then((user)=>{
    if(user == error.RECORD_EMPTY){
      res.statusCode = 400;
      res.end();
    }
    else{
      res.statusCode = 200;
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
      res.statusCode = 400;
      res.end();
      // res.statusCode =200;
      // res.setHeader('Content-Type','application/json');
      // res.json({success:false, status: error.RECORD_EMPTY});
    }
    else{
      res.statusCode =200;
      res.setHeader('Content-Type','application/json');
      res.json(user);
    }
  }, (err) => next(err))
  .catch((err) => next(err));
  //console.log(res.locals);
});

router.post('/refresh', (req, res, next) =>{
  const refreshToken = req.body.refreshToken;

  if(refreshToken in refreshTokens){
    const user = {
      _id: refreshTokens[refreshToken]
    }
    const token = authenticate.getToken({ _id: user});
    const expiresAt = authenticate.getExpiresAt(token);

    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.json({token: token, expiresAt: expiresAt});
  }
  else {
    res.sendStatus(403); 
  }
});

router.post('/login', (req,res,next) =>{
  users.getLogin(req.body.username, req.body.password)
  .then((user) =>{
    //console.log(user);
      if(user == error.USER_INVALID_PASSWORD){
        res.statusCode = 400;
        res.end();
        // res.statusCode =200;
        // res.setHeader('Content-Type','application/json');
        // res.json({success:false, status: error.USER_INVALID_PASSWORD});
      }
      else if(user == error.USER_INVALID_USERNAME){
        res.statusCode = 400;
        res.end();
        // res.statusCode =200;
        // res.setHeader('Content-Type','application/json');
        // res.json({success:false, status: error.USER_INVALID_USERNAME});
      }
      else {
        // console.log(user.username);
        // console.log(user[0].username);
        var accessToken = authenticate.getToken({ _id: user[0].userid});
        var refreshToken = authenticate.getRefreshToken({ _id: user[0].userid});
        refreshTokens[refreshToken] = user[0].userid;
        var expiresAt = authenticate.getExpiresAt(accessToken);

console.log(expiresAt); // this one undefined 
      //   jwt.verify(accessToken, config.secretKey, (err, result) =>{
      //     expiresAt = result.exp;
      // });

        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json({success:true, token: accessToken, refreshToken: refreshToken, expiresAt: expiresAt});
      }
    
  }, (err) => next(err))
  .catch((err) => next(err));
});

router.post('/logout', (req,res,next) =>{
  const refreshToken = req.body.refreshToken;
  if (refreshToken in refreshTokens){
    delete refreshTokens[refreshToken];
  }
  res.sendStatus(204); //success with no content
});

module.exports = router;
