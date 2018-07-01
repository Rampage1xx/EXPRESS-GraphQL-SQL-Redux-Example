import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';

export const CreatorDataType: GraphQLObjectType = new GraphQLObjectType({
    name  : 'CreatorData',
    fields: () => ({
        avatar: {
            type: new GraphQLNonNull(GraphQLString)
        },
        userName: {
            type: new GraphQLNonNull(GraphQLString)

        }
    }),
});
