import {ImagesArrayProtoBuffer, redisClient} from './Redis';
import {ImagesSequelize, LikesSequelize, UsersSequelize} from './SequelizeTables';
import {get} from 'lodash';
export const findImagesSequelize = async (offset) => {
    const cache = await redisClient.getAsync(offset);

    try {
        if (cache) {
            console.log('****** SENT BY REDIS ******');
            const items = await ImagesArrayProtoBuffer({argument: cache, decode: true});
            return items.images;
        } else {
            const findImages = await ImagesSequelize.findAll({
                offset: offset,
                limit: 24,
                order: [['created_at', 'DESC']]
            });
            const payload: any = {images: findImages};
            const encodedResults = await ImagesArrayProtoBuffer({argument: payload, encode: true});
            const cacheImages = await redisClient.setexAsync(offset, 3600, encodedResults);
            return findImages;
        }
    } catch (err) {
        return {error: 'there was an error with the request'};
    }
};

export const removeLikeSequelize = (args) =>
    LikesSequelize.findOne({
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

export const addLikeSequelize = (args, req) =>
    ImagesSequelize.findOne({
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

export const postImageSequelize = (args, req) =>
    UsersSequelize.findById(req.user.id)
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

export const createUserSequelize = (args, avatar) =>
    UsersSequelize.create({
        email: args.email,
        userName: args.userName,
        password: args.password,
        localAccount: true,
        avatar
    }).then((result) => result)
        .catch(e => e);

export const removeImageSequelize = (args, req) =>
    ImagesSequelize.findOne({
        where: {
            id: args.id,
            user_id: req.user.id
        }
    })
        .then((result: any) => result.destroy())
        .then((deletedImage) => deletedImage)
        .catch(e => e);

export const findUserSequelize = (args, id) => {
    return UsersSequelize.findById(
        id,
        {include: [ImagesSequelize, LikesSequelize]}
    )
        .then((result: { dataValues: { images?: any[] } }) => {
            return result;
        }).catch(e => e);
};

export const findUsernameSequelize = (args) =>
    UsersSequelize.findOne({where: {userName: args.userName}})
        .then((result) => {
            // the data we should send back in this case is only the username without any additional details.
            return {userName: get(result, result.userName, 'available')};
        });