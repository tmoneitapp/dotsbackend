var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');

var config = require('../config');

// var passportOpts = {
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey: config.secretKey
// };

// exports.jwtPassport = passport.use(new JwtStrategy(passportOpts, 
//     (jwt_payload, done) => {
//         console.log("JWT payload: ", jwt_payload);
//         const expirationDate = new Date(jwt_payload.exp * 1000);
//         if(expirationDate < new Date()){
//             return done(null, false);
//         }
//         done(null, jwt_payload);
//     }));

// passport.serializeUser(function(user, done){
//     done(null, user.username)
// });

exports.getExpiresAt = function(token) {
    var expiresAt;
    jwt.verify(token, config.secretKey, (err, result) =>{
        if(err){
            console.log(`getExpiresAt error: ${err}`);    
        }
        //console.log(`getExpiresAt result: ${result.exp}`);
        expiresAt = result.exp;
    });
    return expiresAt;
};

exports.getToken = function(user) {
    return jwt.sign(user, config.secretKey,
        {expiresIn: 3600}) //1 hour
};

exports.getRefreshToken = function(user) {
    return jwt.sign(user, config.refreshSecretKey, {expiresIn: 604800}) // 1 week
};

//exports.verifyUser = passport.authenticate('jwt', {session: false});

exports.authenticateToken = (req, res, next) =>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null){
        return res.sendStatus(401);
    }

    jwt.verify(token, config.secretKey, (err, result) =>{
        if(err){
            return res.sendStatus(401);
        }
        //console.log(`authenticate result: ${result}`);
        //console.log(result.exp);
        res.locals = result;
        // console.log(res.locals);
        // console.log(res.locals._id);
        next();
    });
};

//module.exports = {authenticateToken: authenticateToken};