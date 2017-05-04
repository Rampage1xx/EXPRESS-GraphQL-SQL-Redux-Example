import * as React from 'react';

export const OpenModalButton = (props) => {
    const {invisible, toggle, name} = props;
    return invisible ? null : <div className='btn__Navbar' color='danger' onClick={ toggle }>{ name }</div>

};


