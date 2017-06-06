import axios from 'axios';
import {store} from '../store/Store';
import {actionActivateModal, actionLoginStateChange} from '../Actions/ActionCreators';

export const instance1 = axios.create({
    baseURL: 'http://localhost',
    headers: {'Content-Type': 'application/json'},
    validateStatus: (status) => {
        return status >= 200 && status < 300;
    },
    withCredentials: true

});

export const HttpLogin = ({username, password}) => {
    return instance1.post('/login', {username, password})
        .then((response) => response)
        .catch(e => store.dispatch(actionActivateModal(2)));
};

export const formLoginHandler = (formProps): void => {
    const username = formProps.get('username');
    const password = formProps.get('password');
    HttpLogin({username, password})
        .then((res) => store.dispatch(actionLoginStateChange(true)))
        .catch(e => store.dispatch(actionActivateModal(2)));
};

export const logOutHandler = () => {
    instance1.get('/logout')
        .then(res => store.dispatch(actionLoginStateChange(true)))
        .catch(e => {
            store.dispatch(actionActivateModal(2));
        });
};
