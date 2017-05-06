import * as React from 'react';

export const RenderField = ({input, label, type, meta: {asyncValidating, touched, error}}) => (
    <div className='form-group'>
        <label>{ label }</label>
        <div className={ asyncValidating ? 'async-validating' : '' }>
            <input {...input} type={ type } placeholder={ label } className='form-control'/>
            { touched && error && <span>{ error }</span> }
        </div>
    </div>
);
