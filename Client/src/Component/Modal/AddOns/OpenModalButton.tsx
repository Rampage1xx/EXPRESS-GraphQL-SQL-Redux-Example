import * as React from 'react';

interface IProps {
    name: string,
    toggle(): any,
    invisible: boolean,
}

export const OpenModalButton = (props: IProps) => {
    const {invisible, toggle, name} = props;
    if (invisible) {
        return null;
    }

    return <div role='button' className='btn__Navbar' color='danger' onClick={ toggle }>{ name }</div>;

};