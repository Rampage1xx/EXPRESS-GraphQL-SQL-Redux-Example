import * as React from 'react';
import {ModalComponent} from '../ModalComponent';

export const ModalWarnings = (props) => {
  const {activeModal} = props
  return (
<div>
    <ModalComponent name = { 'Account Created!' } modalNumber = { 1 } closingTag = { 'Yeeee!!' }
                    activeModal = { activeModal } invisible = { true }>

        <div className = 'fa fa-check fa-5x' />
        <h3>Account Successfully Created!</h3>

    </ModalComponent>

    <ModalComponent name = { 'Error!' } modalNumber = { 2 } closingTag = { 'Snap...' }
                    activeModal = { activeModal } invisible = { true }>

        <div className = 'fa fa-times fa-4x' />
        <h3>Something went wrong! Please try again!</h3>

    </ModalComponent>
</div>

    )
}