const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const jwt = require('jsonwebtoken');
const User = require('../models/user');

passport.use(new BearerStrategy(
  (token, done)=>{
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
    const userFound = User.findById(decodedToken.userId, (err, user)=>{
      if(err){
        return done(err);
      }
      if(!user){
        return done(null, false)
      }
      return done(null, user, {scope: 'all'})
    })
  }
  
));