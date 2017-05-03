import { GraphQLBoolean, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { ImagesSequelize, LikesSequelize, UsersSequelize } from '../database/Tables';

import { googleID, twitterID } from '../Strings';
import { ImageType } from './ImageQuery';
import { LikesType } from './LikeQuery';

export const UserType = new GraphQLObjectType({
    name : 'UserQL',
    fields : () => ({
        id : { type : GraphQLString },
        userName : { type : GraphQLString },
        email : { type : GraphQLString },
        [twitterID] : { type : GraphQLString },
        images : { type : new GraphQLList(ImageType) },
        likes : { type : new GraphQLList(LikesType) },
        [googleID] : {type : GraphQLString}
    })

});

const findUserGraphQL = (args, id) => {
    console.log(id)
    return UsersSequelize.findById(
        id,
        { include : [ImagesSequelize, LikesSequelize] }
        )
        .then((result : { dataValues : { images? : any[] } }) => {
            return result;
        }).catch(e => e);
};

const guestUserGraphQL = () => {
    return {
        id : 'Guest',
        userName : 'Guest',
        email : 'Guest',
        images : null
    };
};

export const loggedUserImagesGraphQL = {
    type : UserType,
    args : { image : { type : GraphQLBoolean } },
    resolve : (parentValue, args, req) => {

        return req.isAuthenticated() ? findUserGraphQL(args, req.user.id) : guestUserGraphQL();
    }

};

export const findUserImagesGraphQL = {
    type : UserType,
    args : { id : { type : GraphQLString } },
    resolve : (parentValue, args, req) => {
        return findUserGraphQL(args, args.id);
    }
};

export const userFormValidation = {
    type : UserType,
    args : { userName : { type : GraphQLString } },
    resolve : (parentValue, args : { userName : string }, req) => {
        return UsersSequelize.findOne({ where : { userName : args.userName } })
            .then((result) => {
                // the data we should send back in this case is only the username without any additional details.
                // Returning  {userName: null} triggers an error on react-apollo
                // so we need to do a ternary operator to avoid that
                return !result ? result : { userName : result.userName };

            });
    }

};

// MUTATIONS //
export const addUserMutation = {
    type : UserType,
    args : {
        email : {
            type : new GraphQLNonNull(GraphQLString)
        },
        userName : {
            type : new GraphQLNonNull(GraphQLString)
        },
        password : {
            type : new GraphQLNonNull(GraphQLString)
        },
        avatar : {
            type : GraphQLString
        }
    },
    resolve : async (parentValue, args) => {
        const avatar = args.avatar ? args.avatar : undefined;
        return await   UsersSequelize.create({
            email : args.email,
            userName : args.userName,
            password : args.password,
            localAccount : true,
            avatar
        }).then((result) => result)
            .catch(e => e);

    }

};
