import * as React from 'react'
import { Field } from 'redux-form/immutable';
import { RenderField } from './RenderField';
export const AddImageFields = (props) => {

    return (
        <div>
            <Field name='url' type='text' component={ RenderField } label='Url' placeholder='Url'
                                  className='form-control'/>
            <Field name='title' type='text' component={ RenderField } label='Title' placeholder='Title'
                   className='form-control'/>
            <Field name='description' type='text' component={ RenderField } label='Description' placeholder='Description'
                   className='form-control'/>
        </div>
    );
};