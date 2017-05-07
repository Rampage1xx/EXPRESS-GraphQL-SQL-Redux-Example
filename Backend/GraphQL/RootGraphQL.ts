import {GraphQLObjectType, GraphQLSchema} from 'graphql';
import {imagesListGraphQL, postImageMutation, removeImageMutation} from './ImageQuery';
import {addLikeMutation, removeLikeMutation} from './LikeQuery';
import {
    addUserMutation,
    findUserImagesGraphQL,
    loggedUserImagesGraphQL,
    userNameFieldFormValidation
} from './UserQuery';

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: () => ({
        imagesListGraphQL,
        loggedUserImagesGraphQL,
        userNameFieldFormValidation,
        findUserImagesGraphQL
    })
});

const RootMutation = new GraphQLObjectType({
    name: 'Mutations',
    fields: {
        addUserMutation,
        addLikeMutation,
        postImageMutation,
        removeLikeMutation,
        removeImageMutation
    }

});

export const RootSchema = new GraphQLSchema({
    mutation: RootMutation,
    query: RootQuery
});