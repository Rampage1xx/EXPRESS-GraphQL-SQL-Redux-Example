import * as React from 'react';
import {Field} from 'redux-form/immutable';
import {RenderField} from './RenderField';
export const UsernamePasswordFields = (props) => {

    return(
        <div>
            { props.children }
    <Field name='username' type='text' component= { RenderField } label='Username' placeholder='Username'
           className='form-control'/>
    <Field name='password' type='text' component= { RenderField } label='Password' placeholder='Password'
    className='form-control'/>
        </div>
    )
}