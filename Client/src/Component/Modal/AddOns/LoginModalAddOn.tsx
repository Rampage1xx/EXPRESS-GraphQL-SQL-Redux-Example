import * as React from 'react';
import {NavItem, NavLink} from 'reactstrap';
import {formLoginHandler} from '../../../Utils/HttpService';
import {LoginForm} from '../../Form/FormContainer';
import {UsernamePasswordFields} from '../../Form/UsernamePasswordFields';
import {SocialComponent} from '../SocialComponent';

export const LoginModalAddOn = (props) => {

    return (

        <div>
            <SocialComponent socialsArray = { ['twitter', 'google', 'facebook'] } />
            <LoginForm SubmitForm = { formLoginHandler }>
                <UsernamePasswordFields />
            </LoginForm>
        </div>
    );
};