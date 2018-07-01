import { GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { IImageModel } from '../../database/Sequelize/Tables/ImageSequelize';
import { SequelizeModel } from '../../database/Sequelize/SequelizeConnect';
import { CreatorDataType } from './CreatorDataType';
import { ControllerUser } from '../../Controller/ControllerUser';

export const ImageType: GraphQLObjectType = new GraphQLObjectType({
    name  : 'ImageQL',
    fields: () => ({
        id         : { type: GraphQLString },
        title      : { type: GraphQLString },
        url        : { type: GraphQLString },
        description: { type: GraphQLString },
        totalLikes : {
            type   : new GraphQLNonNull(GraphQLInt),
            resolve: async (parentType: IImageModel): Promise<number> =>
            {
                const rows = await SequelizeModel.Like.findAndCountAll({

                    where: {
                        image_id: parentType.id,
                    },
                });

                return rows.count;


            },
        },
        user_id    : { type: GraphQLString },
        created_at : { type: GraphQLString },
        creatorData: {
            type   : new GraphQLNonNull(CreatorDataType),
            resolve: (parentValue: IImageModel) =>
            {

                return ControllerUser.Find(parentValue.user_id);
            },
        },
    }),
});