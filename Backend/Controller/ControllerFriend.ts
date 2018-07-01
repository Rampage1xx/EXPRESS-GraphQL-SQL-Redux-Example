import { IFriendsModel } from '../database/Sequelize/Tables/FriendSequelize';
import { SequelizeModel } from '../database/Sequelize/SequelizeConnect';

export namespace ControllerFriend
{
    export const GetAll = async (user_id: string): Promise<IFriendsModel[]> =>
    {


        return await SequelizeModel.Friend.findAll({
            where: {
                user_id,
            },
        });
    };
}
