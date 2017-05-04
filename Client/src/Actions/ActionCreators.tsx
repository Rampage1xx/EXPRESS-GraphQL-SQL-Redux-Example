export const LOGIN_STATE_CHANGE = 'LOGIN_STATE_CHANGE';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const INDEX_OFFSET = 'INDEX_OFFSET';
export const ACTIVATE_MODAL = 'ACTIVATE_MODAL';

export const actionLoginStateChange = (login: boolean) => {
    return {
        type: LOGIN_STATE_CHANGE,
        login
    };

};

export const actionCloseModal = (modal: boolean) => {
    return {
        type: CLOSE_MODAL,
        modal
    };
};

export const actionActivateModal = (modalNumber) => {
    return {
        type: ACTIVATE_MODAL,
        modalNumber
    }
}