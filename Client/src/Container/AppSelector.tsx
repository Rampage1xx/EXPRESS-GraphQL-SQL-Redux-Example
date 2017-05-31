import {Store} from 'react-redux';
import {createSelector, OutputSelector} from 'reselect';

const userReducerSelector = (state) => state.get('userReducer');

const abstractUserReducerSelector: any = (value: string): any => createSelector(
    userReducerSelector,
    (userReducerSelector) => userReducerSelector.get(value)
);

export const closeModalSelector: OutputSelector<any, any, any> = abstractUserReducerSelector('closeModal');
export const indexOffsetSelector: OutputSelector<any, any, any> = abstractUserReducerSelector('indexOffset');
export const loginStateChangeSelector: OutputSelector<any, any, any> = abstractUserReducerSelector('loginStateChange');
export const activeModalStateChangeSelector: OutputSelector<any, any, any> = abstractUserReducerSelector('activeModal');
export const indexOffset2Selector: OutputSelector<any, any, any> = abstractUserReducerSelector('indexOffset2');

export const propsSelector = (state: Store<{}>, props: {id: string | number}): {} => props;
export const idPropsSelector = createSelector(
    propsSelector,
    (props: {id: string | number}) => props.id
);
