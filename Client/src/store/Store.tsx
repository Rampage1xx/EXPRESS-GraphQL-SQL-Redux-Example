import {History as HistoryType} from 'history';
import createHistory from 'history/createBrowserHistory';
import {ApolloClient, createNetworkInterface} from 'react-apollo';
import {routerMiddleware, routerReducer} from 'react-router-redux';
import {applyMiddleware, compose, createStore, Middleware, Reducer, Store, StoreEnhancerStoreCreator} from 'redux';
import {reducer as formReducer} from 'redux-form/immutable';
import {combineReducers} from 'redux-immutable';
import {userReducer} from './reducer';

declare const process: { env: { NODE_ENV: string } };

const uri: string = process.env.NODE_ENV === 'TEST' ? 'http://localhost:3000/graphql' : '/graphql';

export const client: ApolloClient = new ApolloClient({
    networkInterface: createNetworkInterface({
        uri: `${uri}`,
        opts: {
            credentials: 'same-origin'
        }
    }),
    reduxRootSelector: (state: Map<string, any>) => state.get('apollo')
});
interface IWindowRedux extends Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: StoreEnhancerStoreCreator<{}>;
}
declare const window: IWindowRedux;
// debug for redux
const composeEnhancers: StoreEnhancerStoreCreator<{}> = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// history model
export const History: HistoryType = createHistory();
// inject history model into the router
const historyRouter: Middleware = routerMiddleware(History);
// combining the reducer before putting them into the store
const reducers: Reducer<{}> = combineReducers({
    router: routerReducer,
    userReducer: userReducer,
    apollo: client.reducer(),
    form: formReducer
});

export const store: Store<{}> = createStore(
    reducers,
    composeEnhancers(applyMiddleware(client.middleware(), historyRouter))
);
