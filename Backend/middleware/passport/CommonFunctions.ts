import { UsersSequelize } from '../../database/Tables';

export const findUserPassport = ({ email, SocialDatabaseIDRow, SocialID, socialDisplayName, SocialDatabaseUsernameRow }) : Promise<any> => {
    const findUserError = 'loggedUserImagesGraphQL not found, MIO';
    return UsersSequelize.findOne({
            where : {
                email
            }
        })
        .then((user) => {
            // we check:
            // a)  if there is a result,
            // b)  if that result has the social data
            // c)  in the case if it's not there we proceed to add it
            // d) return the result
            return !user ? user :
                user[SocialDatabaseIDRow] ? user :
                    user.update({
                        [SocialDatabaseIDRow] : SocialID,
                        [SocialDatabaseUsernameRow] : socialDisplayName
                    });

        })
        .catch((e) => {
            throw e;
        });
};
// SHOULD THE USER CHOOSE A GLOBAL USERNAME?
export const createUser = (profile : profileParameters) : Promise<string> => {
    const { email, SocialDatabaseUsernameRow, SocialDatabaseIDRow, socialDisplayName, SocialID } = profile;
    const createUserError = 'loggedUserImagesGraphQL already exists, MIO';
    return UsersSequelize.create({
        email : email,
        [SocialDatabaseIDRow] : SocialID,
        [SocialDatabaseUsernameRow] : socialDisplayName
    }).catch(e => {
        throw createUserError;
    });
};



export const oAuthLoginFunction = async (profile : profileParameters, cb) => {
    const { email, socialDisplayName, SocialID, SocialDatabaseIDRow, avatar, SocialDatabaseUsernameRow } = profile;
    try {
        // a) find the user
        // b) if false(not present) create account
        // c) return result
        const findUserResult = await findUserPassport(profile).catch((e) => {
            throw e;
        });
        const result: resultsDatabasePassport = findUserResult ? findUserResult
            :
            await createUser(profile);
        // data that leaves the server
        const data = {
            userName : result.dataValues[SocialDatabaseUsernameRow],
            id : result.dataValues.id,
            avatar : avatar
        };
        return cb(null, data);
    } catch ( err ) {
        return cb(err);
    }
};
