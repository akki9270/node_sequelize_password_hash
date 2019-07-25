// import passport and passport-jwt modules
const passport = require('passport');
const passportJWT = require('passport-jwt');
 
const models = require('./models');
const config = require('./config/config');
// ExtractJwt to help extract the token
let ExtractJwt = passportJWT.ExtractJwt;
// JwtStrategy which is the strategy for the authentication
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = config.SECRET;


// lets create our strategy for web token
let strategy = new JwtStrategy(jwtOptions, async function(jwt_payload, next) {
    console.log('payload received', jwt_payload);
    let user = await models.User.findOne({ where: { id: jwt_payload.id } });
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  });
  // use the strategy
  passport.use(strategy);