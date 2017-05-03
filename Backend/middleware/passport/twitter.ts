import * as passport from 'passport';
import * as Passport from 'passport-twitter';
import { twitter, twitterID, twitterUsername } from '../../Strings';
import { oAuthLoginFunction } from './CommonFunctions';


const TwitterLoginFunction : oAuthTwitter = async (token, tokenSecret, profile, cb) => {
    const { _json, displayName, id } = profile;
    const { email, profile_image_url } = _json;
    const parameters = {
        email,
        SocialDatabaseIDRow : twitterID,
        SocialID : id,
        SocialDatabaseUsernameRow : twitterUsername,
        socialDisplayName : displayName,
        avatar : profile_image_url
    };
    oAuthLoginFunction(parameters, cb);

};


passport.use(twitter, new Passport.Strategy({
        consumerKey : 'IeDNc5MSTaBNQ8PEiItSxS1Jj',
        consumerSecret : 'QnhT48dG4b0QwlmmeXeSFIlWmhbHRBxMIKgWN4AJPu9btWHrn8',
        callbackURL : 'http://localhost:3000/auth/twitter/callback',
        includeEmail : true
    }, TwitterLoginFunction
));


/*
 const twitterLoginFunction = async(token, tokenSecret, profile: {displayName: string, id, _json:{email, profile_background_image_url, profile_image_url}}, cb) => {
 const parameters = {
 email: profile._json.email,
 SocialDatabaseIDRow: twitterID,
 SocialID: profile.id,
 SocialDatabaseUsernameRow: twitterUsername,
 socialDisplayName: profile.displayName
 };
 try {
 // a) find the user
 // b) if false(not present) create account
 // c) return result
 console.log(profile)
 const findUserResult = await findUserPassport(parameters).catch((e) => {throw e; });
 const result: {dataValues: {twitterUsername, id,}} = findUserResult ? findUserResult : await twitterCreateAccountFunction(token, tokenSecret, profile );
 // data that leaves the server
 const data = {
 userName: result.dataValues.twitterUsername,
 id: result.dataValues.id,
 avatar: profile._json.profile_image_url
 }
 return  cb(null, data);
 } catch (err) {
 return cb(err);
 }
 };
 */

/*const twitterCreateAccountFunction = async(token, tokenSecret, profile: any ): Promise<any> => {
 const parameters = {
 profileEmail: profile._json.email,
 SocialDatabaseIDRow: twitterID,
 SocialID: profile.id,
 SocialDatabaseUsernameRow: twitterUsername,
 socialDisplayName: profile.displayName
 };
 return  await createUser(parameters).catch((e) => {throw e; });

 };*/

// export const passportTwitterLogin = twitterPassport(twitter, TwitterLoginFunction);

