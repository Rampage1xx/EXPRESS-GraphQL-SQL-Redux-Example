import createHistory from 'history/createBrowserHistory';
import {ApolloClient, createNetworkInterface} from 'react-apollo';
import {routerMiddleware, routerReducer} from 'react-router-redux';
import {applyMiddleware, compose, createStore} from 'redux';
import {reducer as formReducer} from 'redux-form/immutable';
import {combineReducers} from 'redux-immutable';
import {userReducer} from './reducer';
declare const process;
const uri = process.env.NODE_ENV === 'TEST' ? 'http://localhost:3000/graphql' : '/graphql';
console.log(uri)
export const client = new ApolloClient({
    networkInterface: createNetworkInterface({
        uri: `${uri}`,
        opts: {
            credentials: 'same-origin'
        }
    }),
    reduxRootSelector: (state) => state.get('apollo')
});

declare const window: any;
// debug for redux
const composeEnhancers: any = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// we create an History model kinda intercepts the url from the browser (not accurate)
export const History = createHistory();

const historyRouter = routerMiddleware(History);
// here we  insert the various reducers that flow into the store
const reducers = combineReducers({
    router: routerReducer,
    userReducer: userReducer,
    apollo: client.reducer(),
    form: formReducer
});

export const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(client.middleware(), historyRouter))
);
