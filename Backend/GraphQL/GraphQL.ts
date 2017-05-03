import {GraphQLObjectType, GraphQLSchema, GraphQLString} from 'graphql';
import {imagesListGraphQL, postImageMutation, removeImageMutation} from './ImageQuery';
import {addLikeMutation, removeLikeMutation} from './LikeQuery';
import {addUserMutation, userFormValidation, loggedUserImagesGraphQL, findUserImagesGraphQL} from './UserQuery';


const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: () => ({
        loggedUserImagesGraphQL,
        imagesListGraphQL,
        userFormValidation,
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