import {Instance} from 'sequelize';

export declare type TProtoBuffer = (Parameters: {
    argument: any | Buffer,
    encode?: boolean,
    decode?: boolean
}) => Promise<any> | Promise<Buffer>;

export interface ILikesAttributes {
    id?: string | number;
    identifier?: string;
    user_id?: string;
    image_id?: string;
}
export interface ILikesInstance extends Instance<ILikesAttributes>, ILikesAttributes {

}


export interface IUserAttributes {
    id?: string;
    enabled?: boolean;
    userName?: string;
    password?: string;
    localAccount?: boolean;
    email?: string;
    twitterID?: string;
    twitterUsername?: string;
    googleID?: string;
    googleUsername?: string;
    avatar?: string;
    username?: string;
}

export interface IUserInstance extends Instance<IUserAttributes>, IUserAttributes {
    verifyPassword(password: string): boolean;
}
