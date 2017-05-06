import {isAlphanumeric, isEmail, isLength} from 'validator';
import {createUserSequelize} from '../database/Controller';

const validateCreateUser = (args, avatar) => {
    const errorMessage = 'the data submitted for the account creation is not valid';
    try {
        isEmail(args.email);
        isAlphanumeric(args.userName);
        //password should be matched against a regex
        isLength(args.password, 6, 20);
        createUserSequelize(args, avatar);
    } catch (err) {
        return {error: errorMessage};
    }
};
