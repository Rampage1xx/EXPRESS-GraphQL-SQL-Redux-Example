import * as React from 'react';
import {formAddImageHandler} from '../../../Utils/GraphQL/Mutations';
import {AddImageFields} from '../../Form/AddImageFields';
import {AddImageForm} from '../../Form/FormContainer';

export const ImageModalAddOn = (props) => {

    return (
        <div>
            <AddImageForm SubmitForm={ formAddImageHandler }>
                <AddImageFields />
            </AddImageForm>
        </div>
    );
};
