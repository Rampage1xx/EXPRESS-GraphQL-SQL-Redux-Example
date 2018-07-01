import * as React from 'react';

declare type TProps = {deletePin: boolean, deleteImage?(): void}

export const CardDelete = (props: TProps) => {
    const {deletePin, deleteImage} = props;
    return deletePin ? (
        <div role='button' className='fa fa-times fa-1x faRed' onClick={ deleteImage }/>

    ) : null;
};