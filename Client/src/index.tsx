import * as React from 'react';
import {ApolloProvider} from 'react-apollo';
import * as ReactDOM from 'react-dom';
import {Router} from 'react-router';
import {actionLoginStateChange} from './Actions/ActionCreators';
import {client, History, store} from './store/Store';
import './style.css';
import routes from './routes';
// callback from popup

(window as any).loginSuccess = () => {
    store.dispatch(actionLoginStateChange(true));
};

ReactDOM.render(
    <ApolloProvider store={ store } client={ client }>
        <Router history={ History }>
            { routes }
        </Router>
    </ApolloProvider>,
    document.getElementById('app')
);