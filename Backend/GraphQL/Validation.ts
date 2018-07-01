import { isAlphanumeric, isEmail, isLength, toDate } from 'validator';

interface IValidationSuccess
{
    error: null;

    validInput: true
}

interface IValidationFail
{

    error: string;

    validInput: false

}

type TValidation = IValidationFail | IValidationSuccess


export namespace Validation
{
    export const CreateUser = (args): TValidation =>
    {
        // const errorMessage = 'the data submitted for the account creation is not valid';

        const email = isEmail(args.email);

        const usernameAlphaNumeric = isAlphanumeric(args.userName);

        const userNameLength = isLength(args.userName, 5, 15);

        //password should be matched against a regex

        const passwordLength = isLength(args.password, 7, 30);

        if (!email || !usernameAlphaNumeric || !userNameLength || !passwordLength)
        {
            return ({
                validInput: false,
                error     : 'placeholder',
            });
        }

        return ({
            error     : null,
            validInput: true,
        });


    };

    export const FindImage = (date): TValidation =>
    {
        const notADate = 'not a valid date';

        const validatedDate = toDate(date);

        if (!validatedDate)
        {
            return ({
                validInput: false,
                error     : notADate,
            });
        }


        return ({

            validInput: true,
            error     : null,
        });

    };

}

