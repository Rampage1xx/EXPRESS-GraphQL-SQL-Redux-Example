import * as React from 'react';
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from 'reactstrap';
import {ConnectedNavContainer} from '../../Container/NavbarContainer/ConnectedNavContainer';
import {NavBrand} from './brand/NavBrand';

interface IProps {
    id: string
}
interface IState {
    isOpen: boolean
}

export class NavbarStrap extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {isOpen: false};
    }

    private  toggle() {
        this.setState({isOpen: !this.state.isOpen});
    }

    public  render() {
        return (
            <div>
                <Navbar color='faded' light toggleable>
                    <NavbarToggler right onClick={ this.toggle }/>
                    <NavBrand/>
                    <Collapse isOpen={ this.state.isOpen } navbar>
                        <ConnectedNavContainer id={ this.props.id } />
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}