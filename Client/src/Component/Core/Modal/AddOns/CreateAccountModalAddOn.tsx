import * as React from 'react';
import {NavItem, NavLink} from 'reactstrap';
import {Field} from 'redux-form/immutable';
import {CreateAccountForm} from '../../Form/FormContainer';
import {RenderField} from '../../Form/RenderField';
import {UsernamePasswordFields} from '../../Form/UsernamePasswordFields';
import {formCreateAccountHandler} from '../../Utils/GraphQL/Mutations';

export const CreateAccountModalAddOn = (props) => {

    return (
        <div>
            <div>Create your local account!</div>

            <CreateAccountForm SubmitForm = { formCreateAccountHandler }>
                <UsernamePasswordFields>
                    <Field name = 'email' type = 'email' component = { RenderField } label = 'Email' placeholder = 'Email'
                           className = 'form-control' />
                </UsernamePasswordFields>
            </CreateAccountForm>

        </div>
    );
};
