import { GraphQLID, GraphQLNonNull, GraphQLObjectType } from 'graphql';

export const LikeType = new GraphQLObjectType({
    name  : 'Like',
    fields: () => ({
        user_id : { type: new GraphQLNonNull(GraphQLID) },
        image_id: { type: new GraphQLNonNull(GraphQLID) },
        id      : { type: new GraphQLNonNull(GraphQLID) },

    }),
});