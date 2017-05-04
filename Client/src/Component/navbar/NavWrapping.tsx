import * as React from 'react';
import { NavItem, NavLink } from 'reactstrap';

export const NavWrapping = (props) => {

    return (
        <NavItem>
            <NavLink>

                { props.children }

            </NavLink>
        </NavItem>

    );
};