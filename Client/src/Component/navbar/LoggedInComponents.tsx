import * as React from 'react';
import {Link} from 'react-router-dom';
import {NavItem, NavLink} from 'reactstrap';
import {logOutHandler} from '../../Utils/HttpService';
import {ImageModalAddOn} from '../Modal/AddOns/ImageModalAddOn';
import {ModalComponent} from '../Modal/ModalComponent';
import {NavWrapping} from './NavWrapping';

export const LoggedInComponents = (props) => {
    const {closeModal, activeModal, id} = props;
    return id !== 'Guest' && id ?
        (
            <div className='LoggedInComponents_Navbar'>
                <NavWrapping>
                    <ModalComponent name={ 'Add Image' } closeModal={ closeModal } activeModal={ activeModal }>
                        <ImageModalAddOn />
                    </ModalComponent>
                </NavWrapping>

                <NavItem>
                    <NavLink tag={ Link } to='/myImages'>My Images</NavLink>
                </NavItem>

                <NavItem>
                    <NavLink onClick={ logOutHandler } tag={ Link } to='/'> Logout</NavLink>
                </NavItem>

            </div>

        ) : null;
};