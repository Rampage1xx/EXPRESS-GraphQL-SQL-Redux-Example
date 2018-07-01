import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { googleID, twitterID } from '../../Strings';
import { ImageType } from './ImageType';
import { IUserAttributes } from '../../types/database.types';
import { SequelizeModel } from '../../database/Sequelize/SequelizeConnect';
import { LikeType } from './LikeType';

export const UserType = new GraphQLObjectType({
    name  : 'UserQL',
    fields: () => ({
        id         : { type: new GraphQLNonNull(GraphQLID) },
        userName   : { type: GraphQLString },
        email      : { type: GraphQLString },
        [twitterID]: { type: new GraphQLNonNull(GraphQLString) },
        images     : {
            type   : new GraphQLList(ImageType),
            resolve: (parentValue: IUserAttributes) =>
            {
                return SequelizeModel.Image.findAll({
                    where: {
                        user_id: parentValue.id,
                    },
                });
            },
        },
        likes      : {
            type   : new GraphQLList(LikeType),
            resolve: (parentValue: IUserAttributes) =>
            {
                return SequelizeModel.Like.findAll({
                    where: {
                        user_id: parentValue.id,
                    },
                });
            },
        },
        [googleID] : { type: GraphQLString },
    }),

});