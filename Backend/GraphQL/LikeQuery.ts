import {GraphQLNonNull, GraphQLObjectType, GraphQLString} from 'graphql';
import {connection, ImagesSequelize, LikesSequelize} from '../database/Tables';

export const LikesType = new GraphQLObjectType({
    name: 'likes',
    fields: () => ({
        user_id: {type: GraphQLString},
        image_id: {type: GraphQLString},
        id: {type: GraphQLString}

    })
});

//TODO: likes issue probably not fixed yet
// TODO: ADDED INCREMENTAL LIKES NEED TO CHECK IF IT WORKS
export const addLikeMutation = {
    type: LikesType,
    args: {
        image_id: {type: new GraphQLNonNull(GraphQLString)}
    },
    resolve: (parentValue, args, req) => {

        return !req.isAuthenticated() ? null :
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
    }
};

// TODO: REFACTORED DECREMENT
export const removeLikeMutation = {
    type: LikesType,
    args: {
        identifier: {type: new GraphQLNonNull(GraphQLString)}
    },
    resolve: (parentValue, args, req) => {
        // destroying  the like through the identifier while
        // returning the properties that it had ( ID, USER_ID, IMAGE_ID )
        return !req.isAuthenticated() ? null :
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
    }
};
