import * as React from 'react';
import {compose, graphql} from 'react-apollo';
import {connect} from 'react-redux';
import {Route} from 'react-router';
import {createStructuredSelector} from 'reselect';
import {actionActivateModal, actionLoginStateChange} from '../Actions/ActionCreators';
import {MainPage} from '../Component/MainPage/MainPage';
import {NavbarStrap} from '../Component/navbar/Navbar';
import {MyImages} from '../Component/ImagesRequest/MyImages';
//import { MyImagesAsync } from './test'
import {History, store} from '../store/Store';
import {createUserMutationOptions} from '../Utils/GraphQL/Mutations';
import {currentUserQueryOptions, fetchPinsQueryOptions2} from '../Utils/GraphQL/Queries';
import {createUser, fetchPins, loggedInUserQuery} from '../Utils/GraphQL/QueryAndMutationsStrings';
import {closeModalSelector, indexOffsetSelector, loginStateChangeSelector} from './AppSelector';
import {LoginCallback} from '../LoginCallback';
import {UserImages} from '../Component/ImagesRequest/UserImages';

export class AppContainer extends React.PureComponent<any, any> {

    constructor(props) {
        super(props);
 this.findUserHandler = this.findUserHandler.bind(this)
    }

    private componentWillReceiveProps(nextProps) {
        if ( nextProps.loginStateChange ) {
            this.props.currentUser.refetch();
            store.dispatch(actionActivateModal(0));
            store.dispatch(actionLoginStateChange(false));
        }
    }
    private findUserHandler ( user_id ) {
       const likes = this.props.currentUser.loggedUserImagesGraphQL.likes;
        History.push('/userImages', {id: user_id, likes})

    }

    public render() {
        const { pins2, currentUser } = this.props;
        const { loggedUserImagesGraphQL } = currentUser;

        // this is a safety check against against a late response from the server
        const id = loggedUserImagesGraphQL ? loggedUserImagesGraphQL.id : 'Guest';
        //react router docs states that component needs to be bound inside render if we need to pass props to it
        const Main = () => <MainPage pins = { pins2 } start = { 0 } end = { 6 } id = { id } findUser= { this.findUserHandler } />;
        const MyImagePage = () => <MyImages userImages = { currentUser } />;

        return (
            <div>
                <NavbarStrap id = { id } />
                <Route exact path = '/' render = { Main } />
                <Route path = '/myImages' render = { MyImagePage } />
                <Route path = '/userImages' component={ UserImages } />
                <Route exact path='/loginDone' component={ LoginCallback }/>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    closeModal : closeModalSelector,
    indexOffset : indexOffsetSelector,
    loginStateChange : loginStateChangeSelector

});

// connect passes the props to the graphql query/mutation.
export const AppContainerConnected: any = compose(
    connect(mapStateToProps, undefined),
    graphql(loggedInUserQuery, currentUserQueryOptions),
    graphql(createUser, createUserMutationOptions),
    graphql(fetchPins, fetchPinsQueryOptions2)
)(AppContainer);

    const Prova = (props) => {
        return (
            <div> ciao </div>
        );
    };