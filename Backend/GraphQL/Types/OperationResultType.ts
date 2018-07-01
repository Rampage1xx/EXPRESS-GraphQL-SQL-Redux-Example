import { GraphQLBoolean, GraphQLID, GraphQLNonNull, GraphQLObjectType } from 'graphql';

export const OperationResultType: GraphQLObjectType = new GraphQLObjectType({
    name  : 'OperationResult',
    fields: () => ({
        success: {
            type: new GraphQLNonNull(GraphQLBoolean),
        },
        id     : {
            type: new GraphQLNonNull(GraphQLID),
        },
    }),
});
