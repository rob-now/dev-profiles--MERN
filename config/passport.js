const JwtStrategy = require('passport-jwt').Strategy
// Destructuring of - const ExtractJwt = require('passport-jwt').ExtractJwt
const { ExtractJwt } = require('passport-jwt')
const mongoose = require('mongoose')

const User = mongoose.model('users')
const config = require('../config')

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = config.secret

module.exports = (passport) => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    console.log(jwt_payload)
  }))
}
