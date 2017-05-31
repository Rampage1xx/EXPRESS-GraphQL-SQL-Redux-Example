import {Instance, STRING, UUID, UUIDV4} from 'sequelize';
import {connection} from '../SequelizeConfiguration';

export interface IFriendRequestAttributes {
    id?: string;
    user_one?: string;
    user_two?: string;
    status?: string;
    last_action_user?: string;
}

export interface IFriendRequestInstance extends Instance<IFriendRequestAttributes>, IFriendRequestAttributes{
}

export const FriendRequestSequelize = connection.define<IFriendRequestInstance, IFriendRequestAttributes >('friend_requests', {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    user_one: {
        type: STRING,
        allowNull: false
    },
    user_two: {
        type: STRING,
        allowNull: false
    },
    status: {
        type: STRING,
        defaultValue: 'PENDING'
    },
    last_action_user: {
        type: STRING
    }

}, {
    underscored: true
});

