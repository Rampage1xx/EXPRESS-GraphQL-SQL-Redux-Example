import { gql } from 'react-apollo/lib';
import { client } from '../../store/Store';

export const createAccountValidation = (values) => {
    const getValues = (prop: string) => values.get(prop);
    const parameters = ['email', 'password', 'username'].map((parameter) => getValues(parameter));
    const errors: any = {};
    if (!parameters[2]) {
        errors.username = 'Required';
    } else if (parameters[2].length < 5) {
        errors.username = 'Should  be at least 5 characters';
    } else if (parameters[2].length > 15) {
        errors.username = 'Should be less than 15 characters';
    }
    if (!parameters[1]) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.get('email'))) {
        errors.email = 'Invalid email address';
    }

    return errors;
};

export const asyncCreateAccountValidation = (formValues) => {
    const userName = formValues.get('username');
    const email = formValues.get('email');
    const field = userName ? userName : email;
    const query = gql`
{
  userFormValidation(userName: "${field}") {
    id
  }
}

`;
    return client.query({ query }).then((res: { userName: string, email: string } | any) => {
        if (res.userName) {
            throw { username: 'Already Taken' };
        } else if (res.email) {
            throw { email: 'Already Taken' };
        }
    });

};

