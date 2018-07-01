import { GraphQLBoolean, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

export const CheckUsernameType: GraphQLObjectType = new GraphQLObjectType({
    name  : 'CheckUsername',
    fields: () => ({
        available  : {
            type: new GraphQLNonNull(GraphQLBoolean),
        },
        nameChecked: {
            type: new GraphQLNonNull(GraphQLString),
        },
    }),
});