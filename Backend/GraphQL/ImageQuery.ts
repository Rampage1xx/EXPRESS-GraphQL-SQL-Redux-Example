import {GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString} from 'graphql';
import {ImagesSequelize, UsersSequelize} from '../database/Tables';
import {ImagesArrayProtoBuffer, redisClient} from '../database/Redis';
import * as protobuf from 'protobufjs';

export const ImageType = new GraphQLObjectType({
    name: 'ImageQL',
    fields: () => ({
        id: {type: GraphQLString},
        title: {type: GraphQLString},
        url: {type: GraphQLString},
        description: {type: GraphQLString},
        userName: {type: GraphQLString},
        totalLikes: {type: GraphQLInt},
        avatar: {type: GraphQLString},
        user_id: {type: GraphQLString}
    })
});

const findImages = async (offset) => {
     const cache = await redisClient.getAsync(offset);

    try {
        if (cache) {
            console.log('****** SENT BY REDIS ******')
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
    } catch(err) {
        return {error: 'there was an error with the request'}
    }
};


export const imagesListGraphQL = {
    type: new GraphQLList(ImageType),
    args: {indexOffset: {type: GraphQLInt}},
    resolve: (parentValue, args: { indexOffset: number }, req) => {
        return findImages(args.indexOffset);
    }
};

export const postImageMutation = {
    type: ImageType,
    args: {
        url: {type: new GraphQLNonNull(GraphQLString)},
        title: {type: new GraphQLNonNull(GraphQLString)},
        description: {type: new GraphQLNonNull(GraphQLString)}
    },
    resolve: (parentValue, args: { url, title, description }, req) => {
        return !req.isAuthenticated() ? null :
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
    }
};

export const removeImageMutation = {
    type: ImageType,
    args: {
        id: {type: new GraphQLNonNull(GraphQLString)}
    },
    resolve: (parentValue, args, req) => {
        return ImagesSequelize.findOne({
            where: {
                id: args.id,
                user_id: req.user.id
            }
        })
            .then((result: any) => result.destroy())
            .then((deletedImage) => deletedImage)
            .catch(e => e);
    }
};