import {onlineStatusPSQL} from '../database/Sequelize/NativeQueries/UsersPSQL';
import {connection} from '../database/Sequelize/SequelizeConfiguration';

export const onlineStatus = ({id, online}) => connection.query(onlineStatusPSQL({id, online}));
