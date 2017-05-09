import * as passport from 'passport';
import * as  Google from 'passport-google-oauth2';
import {googleID, googleUsername} from '../../Strings';
import {oAuthLoginFunction} from '../../database/ControllerPassport';

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
    clientID: '459536215338-iqn1kpt1kgu2r6urbl9d4i2oau42r359.apps.googleusercontent.com',
    clientSecret: '4zUasa4dxF8Ri3iFeXH8hqm2',
    callbackURL: 'http://localhost:3000/auth/google/callback',
    passReqToCallback: true
}, googleLoginFunction));


