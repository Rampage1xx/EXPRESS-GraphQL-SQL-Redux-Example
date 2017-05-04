import { actionActivateModal, actionCloseModal } from '../../Actions/ActionCreators';
import { client, store } from '../../store/Store';
import { addImageMutation, addLikeMutation, createUser, removeImageMutation, removeLikeMutation } from './QueryAndMutationsStrings';

//TODO: INSERIRE ERROR HANDLING SE L'AZIONE NON VA A BUON FINE
//TODO: a)postare immagini da non loggato non produce alcun effetto ora, invece di un errore

//TODO: va spostata in axios


// OPTIONS //
export const createUserMutationOptions = {
    // we pass a method to props containing the variables of the mutation
    // doing so we detach the  mutation from the view state
    name : 'userCreate',
    props : ({ userCreate }) => ({
        userCreateFunction : (email, userName, password) =>
            userCreate({ variables : { email, userName, password } })
    })
};

// MUTATIONS //
// store.dispatch(actionLoginStateChange(true))
export const removeImageHandler = (id) => {
    client.mutate({ mutation : removeImageMutation, variables : { id } })
        .then(res => 'Image removed')
        .catch(e => 'Remove image error!');
};

export const addLikeHandler = (image_id) => {
    client.mutate({ mutation : addLikeMutation, variables : { image_id } })
        .then((res) => 'Like done!')
        .catch(e => 'Like add error!');
};

export const removeLikeHandler = (identifier) => {
    client.mutate({ mutation : removeLikeMutation, variables : { identifier } })
        .then((res) => 'Done!')
        .catch(e => 'Like remove error');
};

export const formCreateAccountHandler = (formProps) : void => {
    const getValues = (value) => formProps.get(value);
    /*  const username = formProps.get('username');
     const password = formProps.get('password');
     const email = formProps.get('email')*/
    const values = ['username', 'email', 'password'].map((value) => getValues(value));
    client.mutate({
        mutation : createUser, variables : { userName : values[0], email : values[1], password : values[2] }
    }).then(res => {
            store.dispatch(actionCloseModal(true));
            store.dispatch(actionActivateModal(1));
        })
        .catch(e => store.dispatch(actionActivateModal(2)));
    // we close the create account modal
  //  store.dispatch(actionCloseModal(true));

};

export const formAddImageHandler = (formProps) : void => {
    const getValues = (value) => formProps.get(value);
    const values = ['url', 'title', 'description'].map((value) => getValues(value));
    client.mutate({
            mutation : addImageMutation, variables : { url : values[0], title : values[1], description : values[2] }
        })
        .then((res) => 'Image successfully added!')
        .catch((res) => 'Wops error! Try again later!');
};
