import {STRING} from 'sequelize';
import {ILikesAttributes, ILikesInstance} from '../../../types/database.types';
import {connection} from '../SequelizeConfiguration';

export const LikesSequelize = connection.define<ILikesInstance, ILikesAttributes>('likes', {
        identifier: {
            type: STRING,
            allowNull: false,
            unique: true
        }
    },
    {
        underscored: true
    });
