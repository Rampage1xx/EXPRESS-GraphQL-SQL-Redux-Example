import {createDummyImages} from '../CreateDummyCards';
import {connection, NODE_TEST, sleep} from './SequelizeConfiguration';
import {FriendRequestSequelize} from './Tables/FriendRequestsSequelize';
import {FriendsSequelize} from './Tables/FriendsSequelize';
import {ImagesSequelize} from './Tables/ImagesSequelize';
import {LikesSequelize} from './Tables/LikesSequelize';
import {UsersSequelize} from './Tables/UsersSequelize';

LikesSequelize.belongsTo(ImagesSequelize);
LikesSequelize.belongsTo(UsersSequelize);
ImagesSequelize.belongsTo(UsersSequelize);
ImagesSequelize.hasMany(LikesSequelize);
UsersSequelize.hasMany(ImagesSequelize);
UsersSequelize.hasMany(LikesSequelize);
UsersSequelize.hasMany(FriendRequestSequelize);
UsersSequelize.hasMany(FriendsSequelize);

if (!NODE_TEST) {
    connection.sync({force: true})
        .then(connection => console.log('******CONNECTED TO POSTGRES******'))
        .catch(e => e);
    sleep(4000).then(r => createDummyImages())
        .catch(e => console.log(e));
}
