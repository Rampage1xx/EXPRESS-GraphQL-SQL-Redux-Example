import { Instance, STRING, UUID, UUIDV4 } from 'sequelize';
import { connection } from '../SequelizeConfiguration';
import { IAuditModelCreation } from './Interfaces/IAudit';

export interface IImageModel extends IImageCreation
{
    id: string;

    created_at: string;

    updated_at: string;
}

interface IImageCreation extends IAuditModelCreation
{
    id?: string

    title: string;

    url: string;

    // // totalLikes?: number;
    // userName: string;

    // avatar: string;

    user_id: string;

    description: string;
}

export interface IImageInstance extends Instance<IImageModel>, IImageModel
{
    isNewRecord: boolean;
}

export const ImageSequelize = connection.define<IImageInstance, IImageCreation>('images', {
        id         : {
            type        : UUID,
            primaryKey  : true,
            defaultValue: UUIDV4,
            allowNull   : false,
        },
        title      : {
            type: STRING,
        },
        url        : {
            type: STRING,
        },
        description: {
            type: STRING,
        },

        // userName: {
        //     type: STRING,
        // },
        // avatar  : {
        //     type        : STRING,
        //     defaultValue: 'http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png',
        // },
    },
    {
        underscored: true,
    });
