import {GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString} from 'graphql';
import {postImageSequelize, removeImageSequelize} from '../Controller/ControllerGraphQL';
import {IImageListGraphQL} from '../types/GraphQL.types';
import {findImageValidation} from './Validation';

export const ImageType: GraphQLObjectType = new GraphQLObjectType({
    name: 'ImageQL',
    fields: () => ({
        id: {type: GraphQLString},
        title: {type: GraphQLString},
        url: {type: GraphQLString},
        description: {type: GraphQLString},
        userName: {type: GraphQLString},
        totalLikes: {type: GraphQLInt},
        avatar: {type: GraphQLString},
        user_id: {type: GraphQLString},
        created_at: {type: GraphQLString}
    })
});



export const imagesListGraphQL: IImageListGraphQL = {
    type: new GraphQLList(ImageType),
    args: {indexOffset: {type: GraphQLString}},
    resolve: (parentValue, args, req) => {
        //   return findImagesSequelize(args.indexOffset);
        return findImageValidation(args.indexOffset);
    }
};
export const postImageMutation = {
    type: ImageType,
    args: {
        url: {type: new GraphQLNonNull(GraphQLString)},
        title: {type: new GraphQLNonNull(GraphQLString)},
        description: {type: new GraphQLNonNull(GraphQLString)}
    },
    resolve: (parentValue, args, req) => {
        return !req.isAuthenticated() ? null : postImageSequelize(args, req);
    }
};

export const removeImageMutation = {
    type: ImageType,
    args: {
        id: {type: new GraphQLNonNull(GraphQLString)}
    },
    resolve: (parentValue, args, req) => {
        return removeImageSequelize(args, req);
    }
};
