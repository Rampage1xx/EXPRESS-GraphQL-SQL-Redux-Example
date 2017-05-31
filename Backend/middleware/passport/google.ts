import * as passport from 'passport';
import * as  Google from 'passport-google-oauth2';
import {googleClientID, googleClientSecret} from '../../config/keys';
import {oAuthLoginFunction} from '../../Controller/ControllerPassport';
import {googleID, googleUsername} from '../../Strings';

declare const ENV_CLIENT_GOOGLE;
declare const ENV_SECRET_GOOGLE;
const googleLoginFunction: oAuthGoogle = async (request, accessToken, refreshToken, profile, cb) => {
    const {email, id, name, photos, displayName} = profile;
    const {value} = photos[0];

    const parameters = {
        email: email,
        SocialDatabaseIDRow: googleID,
        SocialID: id,
        SocialDatabaseUsernameRow: googleUsername,
        socialDisplayName: displayName,
        avatar: value
    };
    oAuthLoginFunction(parameters, cb);

};

passport.use('google', new Google.Strategy({
    clientID: `${googleClientID}`,
    clientSecret: `${googleClientSecret}`,
    callbackURL: 'http://localhost:3000/auth/google/callback',
    passReqToCallback: true
}, googleLoginFunction));


