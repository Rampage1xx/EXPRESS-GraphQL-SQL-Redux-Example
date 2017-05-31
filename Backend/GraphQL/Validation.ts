import {isAlphanumeric, isDate, isEmail, isLength, toDate} from 'validator';
import {createUserSequelize, findImagesSequelize} from '../Controller/ControllerGraphQL';

export const validateCreateUser = (args, avatar) => {
    const errorMessage = 'the data submitted for the account creation is not valid';
    try {
        const email = isEmail(args.email);
        const usernameAlphaNumeric = isAlphanumeric(args.userName);
        const userNameLength = isLength(args.userName, 5, 15);
        //password should be matched against a regex
        const passwordLength = isLength(args.password, 7, 30);
        if (!email || !usernameAlphaNumeric || !userNameLength || !passwordLength) {
            throw errorMessage;
        }

        return createUserSequelize(args, avatar);

    } catch (err) {
        return {error: errorMessage};
    }
};

export const findImageValidation = (date) => {
    const notADate = 'not a valid date';
    try {
        const validatedDate = toDate(date);

        if (!validatedDate) {
            throw  notADate;
        } else {
            return findImagesSequelize(date);
        }

    } catch (err) {

        return {error: err};
    }

};
