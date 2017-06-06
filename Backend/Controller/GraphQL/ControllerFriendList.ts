import {getFriends} from '../../database/Sequelize/NativeQueries/FriendsPSQL';
import {connection} from '../../database/Sequelize/SequelizeConfiguration';
export const FriendListFetch = async (args, req) => {
 return await connection.query(getFriends(req.users.id));
};
