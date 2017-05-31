import * as express from 'express';
import {GraphQLList, GraphQLObjectType, GraphQLScalarType} from 'graphql';
import {IImageInstance} from '../database/Sequelize/Tables/ImagesSequelize';

export interface IImageListGraphQL  {
    type: GraphQLList<GraphQLObjectType>;
    args: { indexOffset: { type: GraphQLScalarType; } };
    resolve (parentValue: any, args: {indexOffset: string}, req: express.Request):  Promise<IImageInstance[]> | {error: any};
}
