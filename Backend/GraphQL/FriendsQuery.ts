import {GraphQLObjectType, GraphQLString} from 'graphql';
import {FriendListFetch} from '../Controller/GraphQL/ControllerFriendList';

const FriendsType = new GraphQLObjectType({
    name: 'Friends',
    fields: () => ({
        userName: {type: GraphQLString},
        friendId: {type: GraphQLString},
        friendUsername: {type: GraphQLString}
    })
});

const FriendListQuery = {
    type: FriendsType,
    resolve: (parentValue, args, req) => {
       return FriendListFetch(args, req);
    }

};
