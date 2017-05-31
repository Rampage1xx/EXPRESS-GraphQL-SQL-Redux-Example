import * as bcrypt from 'bcrypt';
import {BOOLEAN, Instance, STRING, UUID, UUIDV4} from 'sequelize';
import {twitterID, twitterUsername} from '../../../Strings';
import {IUserAttributes, IUserInstance} from '../../../types/database.types';
import {connection} from '../SequelizeConfiguration';

export const UsersSequelize = connection.define<IUserInstance, IUserAttributes>('users', {
        id: {
            type: UUID,
            primaryKey: true,
            defaultValue: UUIDV4,
            allowNull: false
        },
        enabled: {
            type: BOOLEAN,
            defaultValue: false
        },
        userName: {
            type: STRING,
            unique: true
        },
        password: {
            type: STRING
        },
        // checks if the local login is enabled
        localAccount: {
            type: BOOLEAN,
            defaultValue: false
        },
        email: {
            type: STRING,
            unique: true
        },
        [twitterID]: {
            type: STRING,
            unique: true
        },
        [twitterUsername]: {
            type: STRING,
            unique: true
        },
        googleID: {
            type: STRING,
            unique: true
        },
        googleUsername: {
            type: STRING,
            unique: true
        }

    },
    {
        underscored: true,
        hooks: {
            beforeUpdate: (user: Instance<object> | any, options?: {}): Promise<Instance<object>> => {
                if (user.changed('password')) {
                    return bcrypt.genSalt(10)
                        .then((salt) => bcrypt.hash(user.password, salt))
                        .then((result) => {
                            user.password = result;
                            return user;
                        });

                }
            },

            beforeCreate: function (user: Instance<any> | any, options?: {}) {
                // Because we allow users to login without having a local Username/Password
                // we need to check if a password is present before proceeding to hashing
                return !user.password ? user : bcrypt.genSalt(10)
                    .then((salt) => bcrypt.hash(user.password, salt))
                    .then((result) => {
                        user.password = result;
                        return user;
                    });
            }
        },
        instanceMethods: {
            verifyPassword: function (password: string): Promise<boolean> {
                const user = this; // tslint:disable-line
                return bcrypt.compare(password, user.password)
                    .then(result => result);

            }
        }
    }
);
