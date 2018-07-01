import { GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';
import { IImageListGraphQL } from '../types/GraphQL.types';
import { ImageType } from './Types/ImageType';
import { OperationResultType } from './Types/OperationResultType';
import { Authentication } from './Utilities/Authentication';
import { ControllerImage } from '../Controller/ControllerImage';


export const imagesGetManyGraphQL: IImageListGraphQL = {
    type   : new GraphQLList(ImageType),
    args   : {
        indexOffset: {
            type: GraphQLString,
        },
    },
    resolve: (parentValue, args, req) =>
    {
        return ControllerImage.FindMany(args.indexOffset);
    },
};

export const imageAddMutation = {
    type   : OperationResultType,
    args   : {
        url        : { type: new GraphQLNonNull(GraphQLString) },
        title      : { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: (parentValue, args, req) =>
    {
        Authentication.CheckIfLogged(req);

        return ControllerImage.Create(args, req.user.id);
    },
};

export const imageDeleteMutation = {
    type   : OperationResultType,
    args   : {
        id: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: (parentValue, args, req) =>
    {
        return ControllerImage.Delete(args, req);
    },
};
