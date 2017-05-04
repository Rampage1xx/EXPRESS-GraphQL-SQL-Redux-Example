import * as React from 'react';
import {NavbarBrand, NavLink} from 'reactstrap';
import {Circle} from './Circle';
import {Link} from 'react-router-dom';

export const NavBrand = (props) => {
   // const HomePage = () => <NavLink tag={Link} to='/'/>
    return (

            <NavLink className='brand__Navbar' tag = { Link } to = '/'>
            <Circle text={ 'P' }/>
            <Circle text={ 'I' }/>
            <Circle text={ 'N' }/>
            <Circle text={ 'I' }/>
            <Circle text={ 'T' }/>
            </NavLink>
    );
};