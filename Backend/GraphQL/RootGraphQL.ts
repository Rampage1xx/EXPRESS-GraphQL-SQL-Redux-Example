import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { imageAddMutation, imageDeleteMutation, imagesGetManyGraphQL } from './ImageQueryAndMutations';
import { likeAddMutation, likeDeleteMutation } from './LikeQueryAndMutations';
import { userAddMutation, userCheckIfUsernameTaken } from './UserQueryAndMutations';

const RootQuery = new GraphQLObjectType({
    name  : 'RootQuery',
    fields: () => ({
        images_get_many         : imagesGetManyGraphQL,
        user_check_name_if_taken: userCheckIfUsernameTaken,
        // user_login              : userLogin,
    }),
});

const RootMutation = new GraphQLObjectType({
    name  : 'Mutations',
    fields: {
        user_create : userAddMutation,
        like_create : likeAddMutation,
        like_delete : likeDeleteMutation,
        image_create: imageAddMutation,
        image_delete: imageDeleteMutation,
    },

});

export const RootSchema = new GraphQLSchema({
    mutation: RootMutation,
    query   : RootQuery,
});