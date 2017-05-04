import * as React from 'react';
import { Route } from 'react-router';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, NavLink } from 'reactstrap';
import {  actionCloseModal } from '../../Actions/ActionCreators';
import { store } from '../../store/Store';
import { Link } from 'react-router-dom'

export class ModalComponent extends React.Component<any, any> {

    private buttonRender : any;
    private buttonRender2 : any;

    constructor(props) {
        super(props);
        this.state = {
            modal : false
        };
        this.toggle = this.toggle.bind(this);

        const {place, invisible, name, closingTag} = this.props

        this.buttonRender = invisible ? undefined : place === 'navbar' ?
            <div  className='modal__Navbar' onClick = { this.toggle }> { name } </div>
            :
            <div className = 'btn__Navbar' color = 'danger' onClick = { this.toggle }>{ name }</div>

        this.buttonRender2 = invisible ?
            <Button color = 'primary' onClick = { this.toggle }>{ closingTag }</Button>
            :
            undefined;

    }

    private componentWillReceiveProps(nextProps) {
        // when form contained in the modal get submitted it dispatches an action to
        // informs the modal to close itself.
        // This if statement executes the order  and after that reverts the store closeModal state
        // to the original one
        if ( nextProps.closeModal ) {
            this.setState({
                modal : false
            });
            store.dispatch(actionCloseModal(false));
        } else if ( nextProps.activeModal === nextProps.modalNumber ) {
            this.setState({
                modal : true
            });

        }
    }

    private  toggle() {
        this.setState({
            modal : !this.state.modal
        });
    }

    public  render() {
        const { name } = this.props;

        return (
            <div>
                {this.buttonRender}
                <Modal isOpen = { this.state.modal } toggle = { this.toggle }>
                    <ModalHeader toggle = { this.toggle }>{ name }</ModalHeader>
                    <ModalBody>
                        { this.props.children }
                        { this.buttonRender2 }
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}
