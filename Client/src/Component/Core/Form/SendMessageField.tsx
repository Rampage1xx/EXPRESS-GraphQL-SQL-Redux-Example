import * as React from 'react';
import {Field} from 'redux-form';
import {RenderField} from './RenderField';

export const SendMessageField = (props) => {

    return (
        <div>
            { props.children }
            <Field name='message' type='text' component={ RenderField } label='message'
                   placeholder='Type your message here'
                   className='form-control'/>
        </div>

    );
};
