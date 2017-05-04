import { createSelector } from 'reselect';

const userReducerSelector = (state) => state.get('userReducer');

const abstractUserReducerSelector = (value: string) => createSelector(
    userReducerSelector,
    (userReducerSelector) => userReducerSelector.get(value)
);

export const closeModalSelector = abstractUserReducerSelector('closeModal');
export const indexOffsetSelector = abstractUserReducerSelector('indexOffset');
export const loginStateChangeSelector = abstractUserReducerSelector('loginStateChange');
export const activeModalStateChangeSelector = abstractUserReducerSelector('activeModal');

export const propsSelector = (state, props) => props
export const idPropsSelector = createSelector(
    propsSelector,
    (props) => props.id
);
