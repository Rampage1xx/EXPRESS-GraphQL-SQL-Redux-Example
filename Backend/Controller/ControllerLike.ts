import { OperationResult } from './Models/OperationResult';
import { LikeSequelize } from '../database/Sequelize/Tables/LikeSequelize';
import { ImageSequelize } from '../database/Sequelize/Tables/ImageSequelize';

export namespace ControllerLike
{
    export const Delete = async (user_id: string, image_id: string): Promise<OperationResult> =>
    {

        const row = await  LikeSequelize.findOne({
            where  : {
                user_id,
                image_id,
            },
            include: [
                {
                    model   : ImageSequelize,
                    required: true,
                },
            ],
        });
        if (!row)
        {

            throw new Error('no row found');
        }

        await row.destroy();

        return new OperationResult(true, row.id);

    };
    export const Create = async (image_id: string, user_id: string) =>
    {

        const image = await  ImageSequelize.findById(image_id);

        if (!image)
        {
            throw new Error('Image not found');
        }

        await LikeSequelize.create({
            user_id : user_id,
            image_id: image_id,
        });

    };
}

