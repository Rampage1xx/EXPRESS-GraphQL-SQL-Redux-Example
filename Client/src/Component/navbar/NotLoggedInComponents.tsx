import * as React from 'react';
import {CreateAccountModalAddOn} from '../Modal/AddOns/CreateAccountModalAddOn';
import {LoginModalAddOn} from '../Modal/AddOns/LoginModalAddOn';
import {ModalComponent} from '../Modal/ModalComponent';
import {NavWrapping} from './NavWrapping';

export const NotLoggedInComponents = (props) => {
    const { closeModal, activeModal, id } = props;
    return id !== 'Guest' || !id ?
        null
        :
        (
            <div>
                <NavWrapping>
                    <ModalComponent name = { 'Login' } closeModal = { closeModal }
                                    activeModal = { activeModal }>
                        <LoginModalAddOn />
                    </ModalComponent>
                </NavWrapping>

                <NavWrapping>
                    <ModalComponent name = { 'Create Account' } closeModal = { closeModal }
                                    activeModal = { activeModal }>
                        <CreateAccountModalAddOn />
                    </ModalComponent>
                </NavWrapping>
            </div>

        );
};