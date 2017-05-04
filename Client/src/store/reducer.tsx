import { List, Map } from 'immutable';
import { ACTIVATE_MODAL, CLOSE_MODAL, INDEX_OFFSET, LOGIN_STATE_CHANGE } from '../Actions/ActionCreators';

declare type provaType = {
    source : string, imageHeight : number, imageWidth : number, caption : string, list : List<any>
}

const defaultState : Map<string, boolean | number | List<any>> = Map({
    indexOffset : 0,
    closeModal : false,
    userID : 0,
    loginStateChange : false,
    activeModal : 0

});

export const userReducer = (state = defaultState, action? : { modal : boolean, offset : number, type : string, login : boolean, modalNumber: number }) => {
    switch ( action.type ) {
        case CLOSE_MODAL:
            return state.set('closeModal', action.modal);
        case INDEX_OFFSET:
            return state.set('indexOffset', action.offset);
        case LOGIN_STATE_CHANGE:
            return state.set('loginStateChange', action.login);
        case ACTIVATE_MODAL:
            return state.set('activeModal', action.modalNumber)
        default:
            return state;
    }
};