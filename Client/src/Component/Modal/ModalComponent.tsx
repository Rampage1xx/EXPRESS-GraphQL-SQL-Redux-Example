import * as React from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, NavLink} from 'reactstrap';
import {actionCloseModal} from '../../Actions/ActionCreators';
import {store} from '../../store/Store';
import {ModalClosingTag} from './AddOns/ModalClosingTag';
import {OpenModalButton} from './AddOns/OpenModalButton';

interface IProps {
    name: string,
    activeModal: number,
    invisible?: boolean,
    closingTag?: string,
    closeModal?: boolean,
    modalNumber?: number;
}

interface IState {
    modal: boolean
}

export class ModalComponent extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            modal: false
        };
        this.toggle = this.toggle.bind(this);

    }

    public componentWillReceiveProps(nextProps: IProps) {
        // when form contained in the modal get submitted it dispatches an action to
        // informs the modal to close itself.
        // This if statement executes the order  and after that reverts the store closeModal state
        // to the original one
        if (nextProps.closeModal) {
            this.setState({
                modal: false
            });
            store.dispatch(actionCloseModal(false));
        } else if (nextProps.activeModal === nextProps.modalNumber) {
            this.setState({
                modal: true
            });

        }
    }

    private  toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    public  render() {
        const {name, invisible, closingTag} = this.props;

        return (
            <div>
                <OpenModalButton name={ name } invisible={ invisible } toggle={ this.toggle }/>
                <Modal isOpen={ this.state.modal } toggle={ this.toggle }>
                    <ModalHeader toggle={ this.toggle }>{ name }</ModalHeader>
                    <ModalBody>
                        { this.props.children }
                        <ModalClosingTag closingTag={ closingTag } toggle={ this.toggle }/>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}
