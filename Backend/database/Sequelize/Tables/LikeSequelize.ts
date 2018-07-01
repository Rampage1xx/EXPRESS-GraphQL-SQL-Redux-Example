import { Instance } from 'sequelize';
import { connection } from '../SequelizeConfiguration';
import { IAuditModelCreation } from './Interfaces/IAudit';

export interface ILikesAttributes extends ILikesCreation
{
    id: number;


}

interface ILikesCreation extends IAuditModelCreation
{


    user_id: string;

    image_id: string;
}

export interface ILikesInstance extends Instance<ILikesAttributes>, ILikesAttributes
{

}

export const LikeSequelize = connection.define<ILikesInstance, ILikesCreation>('likes', {},
    {
        underscored: true,
    });
