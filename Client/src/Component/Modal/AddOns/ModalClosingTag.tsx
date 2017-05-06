import * as React from 'react';
import {Button} from 'reactstrap';
export const ModalClosingTag = (props) => {
    const {toggle, closingTag} = props;
    if (!closingTag) {
        return null;
    }
    return <Button color='primary' onClick={ toggle }>{ closingTag }</Button>;

};