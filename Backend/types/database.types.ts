import { Instance } from 'sequelize';
import { IFriendsInstance } from '../database/Sequelize/Tables/FriendSequelize';

export declare type TProtoBuffer = (Parameters: {
    argument: any | Buffer,
    encode?: boolean,
    decode?: boolean
}) => Promise<any> | Promise<Buffer>;

export interface IUserAttributes extends IUserCreation
{
    id: string;

}

export interface IUserCreation
{
    id?: string;

    enabled: boolean;

    userName: string;

    password: string;

    localAccount?: boolean;

    email: string;

    twitterID?: string;

    twitterUsername?: string;

    googleID?: string;

    googleUsername?: string;

    avatar?: string;

    // username?: string;

    friends?: IFriendsInstance[];
}

export interface IUserInstance extends Instance<IUserAttributes>, IUserAttributes
{
    verifyPassword (password: string): boolean;
}

interface IFindFriendsParametersPSQL
{
    userName: string;

    friendId: string;

    friendUserName: string;
}

export declare type  IFindFriendsResultsMapped = IFindFriendsParametersPSQL[];
export declare type IFindFriendsResultsPSQL = IFindFriendsResultsMapped[];
