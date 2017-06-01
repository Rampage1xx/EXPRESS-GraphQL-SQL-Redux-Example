import {Instance, STRING, UUID, UUIDV4} from 'sequelize';
import {connection} from '../SequelizeConfiguration';

export interface IFriendsAttributes {
    id?: string;
    user_one?: string;
    user_two?: string;
    status?: boolean;
    user_id?: string;
}
export interface IFriendsInstance extends  Instance<IFriendsAttributes>, IFriendsAttributes {}
export const FriendsSequelize = connection.define<IFriendsInstance, IFriendsAttributes>('friends', {
    id: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    user_one: {
        type: UUID,
        allowNull: false
    },
    user_two: {
        type: UUID,
        allowNull: false
    },
    status: {
        type: STRING,
        allowNull: false
    }
}, {
    underscored: true
});
