import * as bcrypt from 'bcrypt';
import { BOOLEAN, Instance, STRING, UUID, UUIDV4 } from 'sequelize';
import { twitterID, twitterUsername } from '../../../Strings';
import { IUserAttributes, IUserCreation, IUserInstance } from '../../../types/database.types';
import { connection } from '../SequelizeConfiguration';

const UserSequelize = connection.define<IUserInstance, IUserCreation>('users', {
        id               : {
            type        : UUID,
            primaryKey  : true,
            defaultValue: UUIDV4,
            allowNull   : false,
        },
        enabled          : {
            type        : BOOLEAN,
            defaultValue: false,
        },
        userName         : {
            type  : STRING,
            unique: true,
        },
        password         : {
            type: STRING,
        },
        // checks if the local login is enabled
        localAccount     : {
            type        : BOOLEAN,
            defaultValue: false,
        },
        email            : {
            type  : STRING,
            unique: true,
        },
        [twitterID]      : {
            type  : STRING,
            unique: true,
        },
        [twitterUsername]: {
            type  : STRING,
            unique: true,
        },
        googleID         : {
            type  : STRING,
            unique: true,
        },
        googleUsername   : {
            type  : STRING,
            unique: true,
        },
        online           : {
            type        : BOOLEAN,
            defaultValue: false,
        },

    },
    {
        underscored: true,
    },
);

(UserSequelize as any).prototype.verifyPassword = function (this: IUserAttributes, password: string): Promise<boolean>
{
    return bcrypt.compare(password, this.password)
                 .then(result => result);

};

UserSequelize.beforeUpdate(function (user: Instance<object> | any, options?: {})
    {
        if (user.changed('password'))
        {
            return bcrypt.genSalt(10)
                         .then((salt) => bcrypt.hash(user.password, salt))
                         .then((result) =>
                         {
                             user.password = result;
                             return user;
                         });

        }
    },
);
UserSequelize.beforeCreate(function (user: Instance<any> | any, options?: {})
    {
        // Because we allow users to login without having a local Username/Password
        // we need to check if a password is present before proceeding to hashing
        return !user.password ? user : bcrypt.genSalt(10)
                                             .then((salt) => bcrypt.hash(user.password, salt))
                                             .then((result) =>
                                             {
                                                 user.password = result;
                                                 return user;
                                             });
    },
);

export { UserSequelize };