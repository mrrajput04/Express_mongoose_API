const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { secretKey } = require("../config");
const { userData } = require("../model/model");

module.exports = function (passport) {
  passport.use(
    new JwtStrategy(
      {
        secretOrKey: secretKey,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      },
      function (jwt_payload, done) {
        userData.findOne({ _id: jwt_payload._id }, function (err, user) {
          if (err) {
            return done(err, false);
          }
          if (user) {
            return done(null, user);
          } else {
            return(null, false);
          }
        });
      }) 
      )};
