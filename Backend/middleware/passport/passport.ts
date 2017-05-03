import * as passport from 'passport';
import * as Facebook from 'passport-facebook';
import * as Local from 'passport-local';
import {UsersSequelize} from '../../database/Tables';

passport.use('local', new Local.Strategy(
   async (userName, password, done) => {
    const user =  await UsersSequelize.findOne({where: {userName}});

       if (!user || !user.localAccount) {
           // sends back 401

           return done(null, false);
       } else {
           const result = await user.verifyPassword(password);
           // could pass a third argument that contains the error message
           const parameters = {

           };
           return result ? done(null, user) : done(null, false);
       }
    }
));

passport.use('facebook', new Facebook.Strategy({
    clientID: '436064753401155',
    clientSecret: '613a781a60849ae554cfb6b74cbfcba1',
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    passReqToCallback: true
}, function(accessToken, refreshToken, profile, done) {
    //  return done(null, profile.id);
}));

passport.serializeUser((profile, done) => {
    done(null, profile);

});

passport.deserializeUser((reply, done) => {
 return   done(null, reply);
});
