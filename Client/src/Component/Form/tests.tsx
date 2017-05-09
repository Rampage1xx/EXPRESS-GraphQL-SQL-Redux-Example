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
    const username = Map({username: ''});
    it('should return an error object with all the fields marked as required', () => {
        const query = createAccountValidation(false);
        expect(query).toEqual({
            username: 'Required',
            email: 'Required',
            password: 'Required'
        });

        it('should return username required', () => {

     })

    });
});