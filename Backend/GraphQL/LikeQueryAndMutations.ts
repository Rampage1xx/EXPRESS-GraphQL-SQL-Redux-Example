import { GraphQLNonNull, GraphQLString } from 'graphql';
import { Authentication } from './Utilities/Authentication';
import { ControllerLike } from '../Controller/ControllerLike';
import { LikeType } from './Types/LikeType';

export const likeAddMutation = {
    type   : LikeType,
    args   : {
        image_id: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: (parentValue, args, req) =>
    {

        Authentication.CheckIfLogged(req);

        return ControllerLike.Create(args, req);
    },
};

export const likeDeleteMutation = {
    type   : LikeType,
    args   : {
        user_id : { type: new GraphQLNonNull(GraphQLString) },
        image_id: { type: new GraphQLNonNull(GraphQLString) },

    },
    resolve: (parentValue, args, req) =>
    {
        Authentication.CheckIfLogged(req);

        return ControllerLike.Delete(args.user_id, args.image_id);

    },
};
