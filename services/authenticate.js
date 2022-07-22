var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');

var config = require('../config');

exports.getToken = function(user) {
    return jwt.sign(user, config.secretKey,
        {expiresIn: 3600})
};

exports.getRefreshToken = function(user) {
    return jwt.sign(user, config.refreshSecretKey, {expiresIn: 86400})
};

exports.authenticateToken = (req, res, next) =>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null){
        return res.sendStatus(401);
    }

    jwt.verify(token, config.secretKey, (err, result) =>{
        if(err){
            return res.sendStatus(403);
        }
        res.locals = result;
        next();
    });
};

//module.exports = {authenticateToken: authenticateToken};