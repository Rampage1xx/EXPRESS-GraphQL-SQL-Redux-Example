import * as passport from 'passport';
import * as Local from 'passport-local';
import {UsersSequelize} from '../../database/Sequelize/Tables/UsersSequelize';

passport.use('local', new Local.Strategy(
    async (userName, password, done) => {
        const user = await UsersSequelize.findOne({where: {userName}});

        if (!user || !user.localAccount) {
            // sends back 401

            return done(null, false);
        } else {

            const result = await user.verifyPassword(password);
            // could pass a third argument that contains the error message
            // if result is false  password didn't match
            return result ? done(null, user) : done(null, false);
        }
    }
));

passport.serializeUser((profile, done) => {
    done(null, profile);

});

passport.deserializeUser((reply, done) => {
    return done(null, reply);
});
