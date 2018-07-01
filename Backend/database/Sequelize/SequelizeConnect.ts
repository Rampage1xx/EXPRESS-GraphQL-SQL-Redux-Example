import { createDummyImages } from '../DatabaseSeeding';
import { connection, NODE_TEST, sleep } from './SequelizeConfiguration';
import { FriendRequestSequelize } from './Tables/FriendRequestsSequelize';
import { FriendSequelize } from './Tables/FriendSequelize';
import { ImageSequelize } from './Tables/ImageSequelize';
import { LikeSequelize } from './Tables/LikeSequelize';
import { UserSequelize } from './Tables/UserSequelize';

LikeSequelize.belongsTo(ImageSequelize);
LikeSequelize.belongsTo(UserSequelize);
ImageSequelize.belongsTo(UserSequelize);
ImageSequelize.hasMany(LikeSequelize);
UserSequelize.hasMany(ImageSequelize);
UserSequelize.hasMany(LikeSequelize);
UserSequelize.hasMany(FriendRequestSequelize);


UserSequelize.belongsToMany(UserSequelize, { through: FriendRequestSequelize, foreignKey: 'user_one' });

UserSequelize.belongsToMany(UserSequelize, { through: FriendRequestSequelize, foreignKey: 'user_two' });

UserSequelize.belongsToMany(UserSequelize, { through: FriendSequelize, foreignKey: 'user_one' });

UserSequelize.belongsToMany(UserSequelize, { through: FriendSequelize, foreignKey: 'user_two' });

if (!NODE_TEST)
{
    connection.sync({ force: true })
              .then(connection => console.log('******CONNECTED TO POSTGRES******'))
              .catch(e => e);
    sleep(4000).then(r => createDummyImages())
               .catch(e => console.log(e));
}

export namespace SequelizeModel
{
    export const Like = LikeSequelize;
    export const Image = ImageSequelize;
    export const User = UserSequelize;
    export const Friend = FriendSequelize;
    export const FriendRequest = FriendRequestSequelize;

}