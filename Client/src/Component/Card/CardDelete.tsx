import * as React from 'react';

export const CardDelete = (props) => {
    const {deletePin, deleteImage} = props;
    return deletePin ? (
        <div className='fa fa-times fa-1x faRed' onClick={ deleteImage }/>

    ) : null;
};