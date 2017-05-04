import * as bcrypt from 'bcrypt';
import * as Sequelize from 'sequelize';
import {Instance} from 'sequelize';
import {twitterID, twitterUsername} from '../Strings';
const NODE_TEST = (process.env.NODE_ENV === 'test')
const database: string = NODE_TEST ? 'test' : 'pinit';

export const connection = new Sequelize(`${database}`, 'root', 'MyNewPass', {
    //host: 'localhost',
    host: 'postgres',
    // port: 3306,
    port: 5432,
    logging: false,
    dialect: 'postgres',

});

export const UsersSequelize = connection.define('users', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false
        },
        enabled: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        userName: {
            type: Sequelize.STRING,
            unique: true
        },
        password: {
            type: Sequelize.STRING
        },
        // checks if the local login is enabled
        localAccount: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        email: {
            type: Sequelize.STRING,
            unique: true
        },
        [twitterID]: {
            type: Sequelize.STRING,
            unique: true
        },
        [twitterUsername]: {
            type: Sequelize.STRING,
            unique: true
        },
        googleID: {
            type: Sequelize.STRING,
            unique: true
        },
        googleUsername: {
            type: Sequelize.STRING,
            unique: true
        }

    },
    {
        underscored: true,
        hooks: {
            beforeUpdate: (user: Instance<object> | any, options): Promise<Instance<object>> => {
                if (user.changed('password')) {
                    return bcrypt.genSalt(10)
                        .then((salt) => bcrypt.hash(user.password, salt))
                        .then((result) => {
                            user.password = result;
                            return user;
                        });

                }
            },

            beforeCreate: function(user: Instance<any> | any, options: {}) {
                // Because we allow users to login without having a local Username/Password
                // we need to check if a password is present before proceeding to hashing
                return !user.password ? user : bcrypt.genSalt(10)
                    .then((salt) => bcrypt.hash(user.password, salt))
                    .then((result) => {
                        user.password = result;
                        return user;
                    });
            },
            afterValidate: function(user, option) {
                console.log('after validate');
            }
        },
        instanceMethods: {
            verifyPassword: function(password): Promise<boolean> {
                const user = this;
                return bcrypt.compare(password, user.password)
                    .then(result => result);

            }
        }
    }
);

export const ImagesSequelize = connection.define('images', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false
        },
        title: {
            type: Sequelize.STRING
        },
        url: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        totalLikes: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        userName: {
            type: Sequelize.STRING
        },
        avatar: {
            type: Sequelize.STRING,
            defaultValue: 'http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png'
        }
    },
    {
        underscored: true,


    });

export const LikesSequelize = connection.define('likes', {
        identifier: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        }
    },
    {
        underscored: true
    });
LikesSequelize.belongsTo(ImagesSequelize);
LikesSequelize.belongsTo(UsersSequelize, {
    // foreignKey: 'email',
    // targetKey: 'email'
});
ImagesSequelize.belongsTo(UsersSequelize);
ImagesSequelize.hasMany(LikesSequelize);
UsersSequelize.hasMany(ImagesSequelize);
UsersSequelize.hasMany(LikesSequelize);

if (!NODE_TEST) {
    connection.sync().catch(e => e);
}
