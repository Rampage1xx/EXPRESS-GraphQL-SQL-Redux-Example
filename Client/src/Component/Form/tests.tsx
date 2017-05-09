import * as React from 'react';
import {mount} from 'enzyme';
import {RenderField} from './RenderField';
import {Field} from 'redux-form/immutable';
import {CreateAccountForm} from './FormContainer';
import {store} from '../../store/Store';
import {Provider} from 'react-redux';
import {createAccountValidation} from './ValidationLogic';
import {Map} from 'immutable';

describe('Input field rendering', () => {
    const mountInputField = mount(
        <Provider store={ store }>
            <CreateAccountForm>
                <Field name='username' type='text' component={ RenderField } label='Username'
                       placeholder='Username'
                       className='form-control'/>
            </CreateAccountForm>
        </Provider>
    );
    it('should connect to the store ', () => {
        expect(mountInputField.find('ReduxForm')).toBeTruthy();
        expect(mountInputField.find('Connect')).toBeTruthy();
    });

    it('should render the form', () => {
        expect(mountInputField.find('Form')).toBeTruthy();
    });

    it('should render the fields of the form', () => {
        const getValues = (field: string, value: string) =>
            expect(mountInputField.find('input').props()[field]).toBe(value);

        getValues('name', 'username');
        getValues('placeholder', 'Username');
        getValues('className', 'form-control');
        getValues('type', 'text');
        getValues('value', '');
    });

});

describe('testing user create form validation', () => {
    //  const userNameRequired = Map({password: 'aasdazzb', email:'azzzzza@aza.com'});
    const makeParameters = (username, password, email) => Map({username, password, email});
    const username = 'donald';
    const email = 'donald@gmail.com';
    const password = 'superdonald';

    it('should return an error object with all the fields marked as required', () => {
        const query = createAccountValidation(false);
        expect(query).toEqual({
            username: 'Required',
            email: 'Required',
            password: 'Required'
        });
    });

    it('should test username validation', () => {

        const userNameRequired = makeParameters(false, password, email);
        const query = createAccountValidation(userNameRequired);
        expect(query).toEqual({username: 'Required'});

        const userNameLengthShort = makeParameters('aa', password, email);
        const query2 = createAccountValidation(userNameLengthShort);
        expect(query2).toEqual({username: 'Should  be at least 5 characters'});

        const userNameLengthLong = makeParameters('adsasadsasdaasdasdsadas', password, email);
        const query3 = createAccountValidation(userNameLengthLong);
        expect(query3).toEqual({username: 'Should be less than 15 characters'});

    });

    it('should test user validation', () => {
        const passwordRequired = makeParameters(username, false, email);
        const query = createAccountValidation(passwordRequired);
        expect(query).toEqual({password: 'Required'});

        const shortPassword = makeParameters(username, 'aa', email);
        const query2 = createAccountValidation(shortPassword);
        expect(query2).toEqual({password: 'Should  be at least 7 characters'});
    });

    it('should test email validation', () => {
        const emailRequired = makeParameters(username, password, false);
        const query = createAccountValidation(emailRequired);
        expect(query).toEqual({email: 'Required'});

        const invalidEmail = makeParameters(username, password, 'a.com');
        const query2 = createAccountValidation(invalidEmail);
        expect(query2).toEqual({email: 'Invalid email address'});
    });

});

