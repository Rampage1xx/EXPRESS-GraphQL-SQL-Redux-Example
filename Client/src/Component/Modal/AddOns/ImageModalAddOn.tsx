import * as React from 'react'
import { AddImageFields } from '../../Form/AddImageFields';
import { AddImageForm } from '../../Form/FormContainer';
import { formAddImageHandler } from '../../../Utils/GraphQL/Mutations';
import { ModalComponent } from '../ModalComponent';

export const ImageModalAddOn = (props) => {

    return (
<div>
        <AddImageForm SubmitForm = { formAddImageHandler }>
            <AddImageFields />
        </AddImageForm>
</div>
    )
}


