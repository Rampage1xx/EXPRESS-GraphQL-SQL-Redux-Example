import * as React from 'react';
import { Button } from 'reactstrap';
import {  reduxForm } from 'redux-form/immutable';
import './ValidationLogic';
import { asyncCreateAccountValidation, createAccountValidation } from './ValidationLogic';

class FormContainer extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
 // sends the values to the function assigned to the handling
    private  handleClick(formProps) {
        this.props.SubmitForm(formProps);
    }

    public    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={ handleSubmit(this.handleClick) }>

                { this.props.children }

                <Button color='primary' type='submit' label='Submit'> Submit </Button>

            </form>

        );
    }

}

export const CreateAccountForm = reduxForm({
    form: 'CreateAccountForm',
    validate: createAccountValidation,
    asyncValidate: asyncCreateAccountValidation,
    asyncBlurFields: ['username']
})(FormContainer);

export const LoginForm = reduxForm({
    form: 'LoginForm'
})(FormContainer);

export const AddImageForm = reduxForm({
    form: 'AddImageForm'
})(FormContainer);
