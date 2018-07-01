import { UserSequelize } from '../database/Sequelize/Tables/UserSequelize';
import { Validation } from '../GraphQL/Validation';


export namespace ControllerUser
{
    export const Create = (args, avatar) =>
    {

        const validation = Validation.CreateUser(args);

        if (!validation.validInput)
        {
            throw new Error(validation.error);
        }

        return UserSequelize.create({
            ...args,
            localAccount: true,
            avatar,
        });

    };
    export const Find = async (id: string) =>
    {

        const user = await  UserSequelize.findById(id);

        if (!user)
        {
            throw new Error('no user found');
        }

        return user;
    };

    export const CheckIfUsernameTaken = async (args: IFindUserNameParameters): Promise<IFindUserName> =>
    {


        const row = await UserSequelize.findOne({ where: { userName: args.userName } });


        return ({
            available  : !!row,
            nameChecked: args.userName,
        });


    };
}


interface IFindUserName
{
    available: boolean;

    nameChecked: string;
}

interface IFindUserNameParameters
{
    userName: string
}

