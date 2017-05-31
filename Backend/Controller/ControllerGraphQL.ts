import {get} from 'lodash';
import {isDate, toDate} from 'validator';
import {ImagesArrayProtoBuffer, redisClient} from '../database/Redis';
import {IImageInstance, ImagesSequelize} from '../database/Sequelize/Tables/ImagesSequelize';
import {LikesSequelize} from '../database/Sequelize/Tables/LikesSequelize';
import {UsersSequelize} from '../database/Sequelize/Tables/UsersSequelize';

export const findImagesSequelize = async (createdAt: string): Promise<IImageInstance[]> => {

    try {
        const cache = await redisClient.getAsync(createdAt);

        if (cache) {
            console.log('****** SENT BY REDIS ******');
            const items = await ImagesArrayProtoBuffer({argument: cache, decode: true});
            return items.images;
        } else {
            const findImages = await ImagesSequelize.findAll({
                where: {
                    created_at: {
                        lte: createdAt
                    }
                },
                limit: 24,
                order: [['created_at', 'DESC']]
            });

            const payload: any = {images: findImages};

            const encodedResults = await ImagesArrayProtoBuffer({argument: payload, encode: true});

            const cacheImages = await redisClient.setexAsync(createdAt, 1, encodedResults);

            return findImages;
        }
    } catch (err) {
        return err;
    }
};

export const removeLikeSequelize = (args) => {
    try {
        return LikesSequelize.findOne({
            where: {
                identifier: args.identifier
            },
            include: [ImagesSequelize]
        })
            .then((like: any) => like.image.decrement('totalLikes')
                .then((image: any) => like.destroy())
                .then((likeDestroyed) => like)
            )
            .catch(e => e);
    } catch (err) {
        return {error: 'error while removing the like'};
    }

};

export const addLikeSequelize = (args, req) => {
    try {
        return ImagesSequelize.findOne({
            where: {
                id: args.image_id
            }
        })
            .then((image: any) =>
                LikesSequelize.create({
                    user_id: req.user.id,
                    image_id: args.image_id,
                    identifier: (req.user.id as string).concat((args.image_id as string))
                }).then((like: any) => {
                    return image.increment('totalLikes')
                        .then(result => like)
                        .catch(e => e);
                })
            );
    } catch (err) {
        return {error: 'error while adding the like'};
    }
};
export const postImageSequelize = (args, req) => {
    try {
        return UsersSequelize.findById(req.user.id)
            .then((user) =>
                !user ? null :
                    ImagesSequelize.create({
                        url: args.url,
                        title: args.title,
                        description: args.description,
                        user_id: user.id,
                        avatar: req.user.avatar,
                        userName: req.user.userName
                    })
            )
            .then((image) => image)
            .catch(e => e);
    } catch (err) {
        return {error: ' error while creating the pin'};
    }
};

export const createUserSequelize = (args, avatar) => {
    try {
        return UsersSequelize.create({
            email: args.email,
            userName: args.userName,
            password: args.password,
            localAccount: true,
            avatar
        }).then((result) => result)
            .catch(e => e);
    } catch (err) {
        return {error: 'error while creating the user'};
    }
};
export const removeImageSequelize = (args, req) => {
    try {
        return ImagesSequelize.findOne({
            where: {
                id: args.id,
                user_id: req.user.id
            }
        })
            .then((result: any) => result.destroy())
            .then((deletedImage) => deletedImage)
            .catch(e => e);
    } catch (err) {
        return {error: 'error while removing the image'};
    }
};
export const findUserSequelize = (args, id) => {
    try {
        return UsersSequelize.findById(
            id,
            {include: [ImagesSequelize, LikesSequelize]}
            )
            .then((result) => {
                return result;
            }).catch(e => e);
    } catch (err) {
        return {error: 'error while finding the user'};
    }
};

export const findUsernameSequelize = (args): {error: string} | Promise<{userName: string}> => {

    try {
        return UsersSequelize.findOne({where: {userName: args.userName}})
            .then((result) => {
                // the data we should send back in this case is only the username without any additional details.
                if (!result) {
                    return {userName: 'available'};
                } else {
                    return {userName: get(result, result.userName)};
                }
            });
    } catch (err) {
        return {error: 'error while finding the user'};
    }
};
