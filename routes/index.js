var express = require('express');
var router = express.Router();
var brcypt = require('bcryptjs');
var crypto = require('crypto');

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  //const password_hash = brcypt.hashSync('password','');
  //const password_hash = crypto.createHash('md5').update('password').digest('hex');

  res.statusCode = 200;
  res.setHeader('Content-Type','application/json');
  //res.end(password_hash);
  //res.end('no result return');

  
});

module.exports = router;
