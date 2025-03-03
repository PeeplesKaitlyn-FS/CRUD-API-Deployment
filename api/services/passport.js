const passport = require('passport');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy;

const User = require('../models/user');
const config = require('../config');

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

const JwtStrategy = new JwtStrategy(jwtOptions, async function(payload, done){
    User.findById(payload.sub, function(error, user){
        if(error){return done(error, false)}
        if(user) {
            done(null, user)
        }else {
            done(null, false)
        }
    })
})

passport.use(JwtStrategy)