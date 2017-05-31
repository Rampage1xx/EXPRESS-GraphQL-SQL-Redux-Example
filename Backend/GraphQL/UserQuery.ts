import {GraphQLBoolean, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString} from 'graphql';
import {findUsernameSequelize, findUserSequelize} from '../Controller/ControllerGraphQL';
import {googleID, twitterID} from '../Strings';
import {ImageType} from './ImageQuery';
import {LikesType} from './LikeQuery';
import {validateCreateUser} from './Validation';

export const UserType = new GraphQLObjectType({
    name: 'UserQL',
    fields: () => ({
        id: {type: GraphQLString},
        userName: {type: GraphQLString},
        email: {type: GraphQLString},
        [twitterID]: {type: GraphQLString},
        images: {type: new GraphQLList(ImageType)},
        likes: {type: new GraphQLList(LikesType)},
        [googleID]: {type: GraphQLString}
    })

});

const guestUserGraphQL = () => {
    return {
        id: 'Guest',
        userName: 'Guest',
        email: 'Guest',
        images: null
    };
};

export const loggedUserImagesGraphQL = {
    type: UserType,
    args: {image: {type: GraphQLBoolean}},
    resolve: (parentValue, args, req) => {

        return req.isAuthenticated() ? findUserSequelize(args, req.user.id) : guestUserGraphQL();
    }

};

export const findUserImagesGraphQL = {
    type: UserType,
    args: {id: {type: GraphQLString}},
    resolve: (parentValue, args, req) => {
        return findUserSequelize(args, args.id);
    }
};

export const userNameFieldFormValidation = {
    type: UserType,
    args: {userName: {type: GraphQLString}},
    resolve: (parentValue, args: { userName: string }, req) => {
        // checks if there is an existing user with the same user name
        return findUsernameSequelize(args);
    }

};

// MUTATIONS //
export const addUserMutation = {
    type: UserType,
    args: {
        email: {
            type: new GraphQLNonNull(GraphQLString)
        },
        userName: {
            type: new GraphQLNonNull(GraphQLString)
        },
        password: {
            type: new GraphQLNonNull(GraphQLString)
        },
        avatar: {
            type: GraphQLString
        }
    },
    resolve: (parentValue, args) => {
        const avatar = args.avatar ? args.avatar : undefined;
        // return createUserSequelize(args, avatar);
        return validateCreateUser(args, avatar);

    }

};
