import { IImageInstance, ImageSequelize } from '../database/Sequelize/Tables/ImageSequelize';
import { ImagesArrayProtoBuffer, redisClient } from '../database/Redis';
import { Op } from 'sequelize';
import { UserSequelize } from '../database/Sequelize/Tables/UserSequelize';
import { SequelizeModel } from '../database/Sequelize/SequelizeConnect';
import { OperationResult } from './Models/OperationResult';


export namespace ControllerImage
{
    //TODO switch to an opaque token cursor
    export const FindMany = async (createdAt: string): Promise<IImageInstance[]> =>
    {

        const cache = await redisClient.getAsync(createdAt);

        if (cache)
        {
            const items = await ImagesArrayProtoBuffer({ argument: cache, decode: true });
            return items.images;
        }

        const findImages = await ImageSequelize.findAll({
            where: {
                created_at: {
                    [Op.lte]: createdAt,
                },
            },
            limit: 24,
            order: [['created_at', 'DESC']],
        });

        const payload = { images: findImages };

        const encodedResults = await ImagesArrayProtoBuffer({ argument: payload, encode: true });
        /**
         * cache images
         */
        await redisClient.setexAsync(createdAt, 1, encodedResults);

        return findImages;


    };
    export const Create = async (args, user_id: string) =>
    {

        const user = await  UserSequelize.findById(user_id);

        if (!user)
        {
            throw new Error('no user found');
        }

        return SequelizeModel.Image.create({
            ...args,
            user_id,
        });
    };
    export const Delete = async (id: string, user_id: string): Promise<OperationResult> =>
    {

        const row = await  ImageSequelize.findById(id);

        if (!row)
        {
            throw new Error('no image found');
        }

        if (row.user_id !== user_id)
        {
            throw new Error('user id not matching');
        }

        await row.destroy();

        return new OperationResult(true, id);


    };
}
