const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');


//authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  function(email,password,done){
      //Find the user and establish the identity
      User.findOne({email: email},function(err,user){
          if(err){
              console.log('Error in finding the user ===> Passport');
              return done(err);   // done() will tell the passport there is an error
          }

          if(!user || user.password != password){
              console.log('Invalid Username/Password');
              return done(null,false);  // done(error is null/no-error,authenticationDone==false)
          }

          return done(null,user);
      })
  }

));

// Serialize the user to decide which key to be kept in cookie
passport.serializeUser(function(user,done){
    done(null,user.id);
});


// Deserialize the user from the key

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in finding the user ===> Passport');
            return done(err);
        }

        return done(null,user);
    })
})


// Check if user is authenticated or not
passport.checkAuthentication = function(req,res,next){

    //if the user is signed-in then pass-on the request to next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    // if user is not signed-in
    return  res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req,res,next){
   if(req.isAuthenticated()){
       //req.user contains the current signed-user from the session-cookie and we are just sending
       // it to locals for the view
       res.locals.user = req.user;
   }
   next();
}

module.exports = passport;