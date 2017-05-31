import {List, Map} from 'immutable';
import {ACTIVATE_MODAL, CLOSE_MODAL, INDEX_OFFSET, LOGIN_STATE_CHANGE} from '../Actions/ActionCreators';

declare type TDefaultState = Map<string, boolean | number | Date | List<{}>>;

const defaultState: TDefaultState = Map({
    indexOffset: new Date(),
    closeModal: false,
    userID: 0,
    loginStateChange: false,
    activeModal: 0

});

declare type TUserReducer<T> =  (state: T, action: {
    modal: boolean, offset: number,
    type: string, login: boolean, modalNumber: number
}) => {};

export const userReducer: TUserReducer<TDefaultState> = (state = defaultState, action?) => {
    switch (action.type) {
        case CLOSE_MODAL:
            return state.set('closeModal', action.modal);
        case INDEX_OFFSET:
            return state.set('indexOffset', action.offset);
        case LOGIN_STATE_CHANGE:
            return state.set('loginStateChange', action.login);
        case ACTIVATE_MODAL:
            return state.set('activeModal', action.modalNumber);
        default:
            return state;
    }
};
