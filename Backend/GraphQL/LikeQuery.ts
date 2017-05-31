import {GraphQLNonNull, GraphQLObjectType, GraphQLString} from 'graphql';
import {addLikeSequelize, removeLikeSequelize} from '../Controller/ControllerGraphQL';

export const LikesType = new GraphQLObjectType({
    name: 'likes',
    fields: () => ({
        user_id: {type: GraphQLString},
        image_id: {type: GraphQLString},
        id: {type: GraphQLString}

    })
});

export const addLikeMutation = {
    type: LikesType,
    args: {
        image_id: {type: new GraphQLNonNull(GraphQLString)}
    },
    resolve: (parentValue, args, req) => {

        return !req.isAuthenticated() ? null : addLikeSequelize(args, req);
    }
};

export const removeLikeMutation = {
    type: LikesType,
    args: {
        identifier: {type: new GraphQLNonNull(GraphQLString)}
    },
    resolve: (parentValue, args, req) => {
        // destroying  the like through the identifier while
        // returning the properties that it had ( ID, USER_ID, IMAGE_ID )
        return !req.isAuthenticated() ? null : removeLikeSequelize(args);

    }
};
