import { GraphQLObjectType, GraphQLString } from 'graphql';

const FriendsType = new GraphQLObjectType({
    name  : 'Friends',
    fields: () => ({
        userName      : { type: GraphQLString },
        friendId      : { type: GraphQLString },
        friendUsername: { type: GraphQLString },
    }),
});


