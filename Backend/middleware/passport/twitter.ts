import * as passport from 'passport';
import * as Passport from 'passport-twitter';
import {twitter, twitterID, twitterUsername} from '../../Strings';
import {oAuthLoginFunction} from './CommonFunctions';

const TwitterLoginFunction: oAuthTwitter = async (token, tokenSecret, profile, cb) => {
    const {_json, displayName, id} = profile;
    const {email, profile_image_url} = _json;
    const parameters = {
        email,
        SocialDatabaseIDRow: twitterID,
        SocialID: id,
        SocialDatabaseUsernameRow: twitterUsername,
        socialDisplayName: displayName,
        avatar: profile_image_url
    };
    oAuthLoginFunction(parameters, cb);

};

passport.use(twitter, new Passport.Strategy({
        consumerKey: 'IeDNc5MSTaBNQ8PEiItSxS1Jj',
        consumerSecret: 'QnhT48dG4b0QwlmmeXeSFIlWmhbHRBxMIKgWN4AJPu9btWHrn8',
        callbackURL: 'http://localhost:3000/auth/twitter/callback',
        includeEmail: true
    }, TwitterLoginFunction
));
