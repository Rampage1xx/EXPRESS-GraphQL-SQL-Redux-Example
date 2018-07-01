import { UserSequelize } from '../database/Sequelize/Tables/UserSequelize';
import { IUserInstance } from '../types/database.types';
import * as uuid from 'uuid';


export const findUserPassport = async ({ email, SocialDatabaseIDRow, SocialID, socialDisplayName, SocialDatabaseUsernameRow }): Promise<IUserInstance | null> =>
{
    const user = await UserSequelize.findOne({
        where: {
            email,
        },
    });

    // we check:
    // a)  if there is a result,
    // b)  if that result has the social data
    // c)  in the case if it's not there we proceed to add it
    // d) return the result

    //todo refactor add types, make more clear

    if (!user)
    {
        return null;
    }

    if (user[SocialDatabaseIDRow])
    {
        return user;
    }

    user[SocialDatabaseIDRow] = SocialID;

    user[SocialDatabaseUsernameRow] = socialDisplayName;

    await user.save();

    return user;
};
export const createUser = async (profile: profileParameters) =>
{
    const { email, SocialDatabaseUsernameRow, SocialDatabaseIDRow, socialDisplayName, SocialID } = profile;


    return UserSequelize.create({
        email                      : email,
        [SocialDatabaseIDRow]      : SocialID,
        [SocialDatabaseUsernameRow]: socialDisplayName,
        enabled                    : true,
        password                   : uuid.v4(),
        userName                   : email,
    });

};

export const oAuthLoginFunction = async (profile: profileParameters, cb) =>
{
    const { avatar, SocialDatabaseUsernameRow } = profile;
    try
    {
        // a) find the user
        // b) if false(not present) create account
        // c) return result
        const findUserResult = await findUserPassport(profile);


        let user: IUserInstance;

        if (findUserResult)
        {
            user = findUserResult;
        }

        else
        {
            user = await createUser(profile);

        }

        // data that leaves the server
        const data = {
            userName: user[SocialDatabaseUsernameRow],
            id      : user.id,
            avatar  : avatar,
        };

        return cb(null, data);

    } catch (err)
    {
        return cb(err);
    }
};
