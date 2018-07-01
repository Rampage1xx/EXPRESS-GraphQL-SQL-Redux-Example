import { Instance, STRING, UUID, UUIDV4 } from 'sequelize';
import { connection } from '../SequelizeConfiguration';

export interface IFriendsModel extends IFriendsCreationParameters
{
    id?: string;
}

export interface IFriendsCreationParameters
{
    user_one: string;

    user_two: string;

    status: boolean;

    user_id: string;
}

export interface IFriendsInstance extends Instance<IFriendsModel>, IFriendsModel
{
}

export const FriendSequelize = connection.define<IFriendsInstance, IFriendsCreationParameters>('friends', {
    id      : {
        type        : UUID,
        primaryKey  : true,
        defaultValue: UUIDV4,
    },
    user_one: {
        type     : UUID,
        allowNull: false,
    },
    user_two: {
        type     : UUID,
        allowNull: false,
    },
    status  : {
        type     : STRING,
        allowNull: false,
    },
}, {
    underscored: true,
});
