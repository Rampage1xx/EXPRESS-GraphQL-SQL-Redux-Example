import * as React from 'react';
import {connect} from 'react-redux';
import {Button, Nav, NavItem, NavLink} from 'reactstrap';
import {createStructuredSelector} from 'reselect';
import {ModalWarnings} from '../../Component/Modal/AddOns/ModalWarnings';
import {LoggedInComponents} from '../../Component/navbar/LoggedInComponents';
import {NotLoggedInComponents} from '../../Component/navbar/NotLoggedInComponents';

import {activeModalStateChangeSelector, closeModalSelector, idPropsSelector} from '../AppSelector';

interface IProps {
    id: string;
    closeModal: boolean;
    activeModal: number;
}

class NavContainer extends React.Component<IProps, any> {
    constructor(props : any) {
        super(props);
    }

    public render(): JSX.Element {
        const { closeModal, id, activeModal } = this.props;

        return (
            <Nav>
                <NotLoggedInComponents closeModal = { closeModal } activeModal = { activeModal } id = { id } />

                <LoggedInComponents closeModal = { closeModal } activeModal = { activeModal } id = { id } />

                <ModalWarnings activeModal = { activeModal } />
            </Nav>

        );
    }
}

const mapStateToProps: any = createStructuredSelector({
    id : idPropsSelector,
    closeModal : closeModalSelector,
    activeModal : activeModalStateChangeSelector
});
export const ConnectedNavContainer : any = connect(mapStateToProps, undefined)(NavContainer);
