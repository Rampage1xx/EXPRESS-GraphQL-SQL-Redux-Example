import * as React from 'react';

export const OpenModalButton = (props) => {
    const {invisible, toggle, name} = props;
    if (invisible) {
        return null;
    }

    return <div role='button' className='btn__Navbar' color='danger' onClick={ toggle }>{ name }</div>;

};