import {Instance, INTEGER, STRING, UUID, UUIDV4} from 'sequelize';
import {connection} from '../SequelizeConfiguration';
interface IImagesAttributes {
    id?: string;
    title?: string;
    url?: string;
    totalLikes?: number;
    userName?: string;
    avatar?: string;
    description?: string;
    user_id?: string;
    created_at?: number;
}

export interface IImageInstance extends Instance<IImagesAttributes>, IImagesAttributes {
    isNewRecord: boolean;
}

export const ImagesSequelize = connection.define<IImageInstance, IImagesAttributes>('images', {
        id: {
            type: UUID,
            primaryKey: true,
            defaultValue: UUIDV4,
            allowNull: false
        },
        title: {
            type: STRING
        },
        url: {
            type: STRING
        },
        description: {
            type: STRING
        },
        totalLikes: {
            type: INTEGER,
            defaultValue: 0
        },
        userName: {
            type: STRING
        },
        avatar: {
            type: STRING,
            defaultValue: 'http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png'
        }
    },
    {
        underscored: true
    });
