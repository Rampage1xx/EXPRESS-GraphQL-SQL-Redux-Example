import { GraphQLNonNull, GraphQLString } from 'graphql';
import { CheckUsernameType } from './Types/CheckUsernameType';
import { ControllerUser } from '../Controller/ControllerUser';
import { UserType } from './Types/UserType';


// export const userLogin = {
//     type   : CheckUsernameType,
//     args   : {
//         userName: {
//             type: new GraphQLNonNull(GraphQLString),
//         },
//     },
//     resolve: (parentValue, args: { userName: string }, req) =>
//     {
//         // checks if there is an existing user with the same user name
//         return ControllerUser.CheckIfUsernameTaken(args);
//     },
// };

export const userCheckIfUsernameTaken = {
    type   : CheckUsernameType,
    args   : {
        userName: {
            type: new GraphQLNonNull(GraphQLString),
        },
    },
    resolve: (parentValue, args: { userName: string }, req) =>
    {
        // checks if there is an existing user with the same user name
        return ControllerUser.CheckIfUsernameTaken(args);
    },

};

// MUTATIONS //
export const userAddMutation = {
    type   : UserType,
    args   : {
        email   : {
            type: new GraphQLNonNull(GraphQLString),
        },
        userName: {
            type: new GraphQLNonNull(GraphQLString),
        },
        password: {
            type: new GraphQLNonNull(GraphQLString),
        },
        avatar  : {
            type: GraphQLString,
        },
    },
    resolve: (parentValue, args) =>
    {
        const avatar = args.avatar ? args.avatar : undefined;
        // return createUserSequelize(args, avatar);
        return ControllerUser.Create(args, avatar);

    },

};
