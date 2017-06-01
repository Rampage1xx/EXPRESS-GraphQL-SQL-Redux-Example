import {get} from 'lodash';
import * as React from 'react';
import {compose, graphql} from 'react-apollo';
import {connect} from 'react-redux';
import {Route} from 'react-router';
import {createStructuredSelector} from 'reselect';
import {actionActivateModal, actionLoginStateChange} from '../Actions/ActionCreators';
import {MyImages} from '../Component/ImagesRequest/MyImages';
import {UserImages} from '../Component/ImagesRequest/UserImages';
import {MainPage} from '../Component/MainPage/MainPage';
import {NavbarStrap} from '../Component/navbar/Navbar';
import {LoginCallback} from '../LoginCallback';
import {History, store} from '../store/Store';
import {createUserMutationOptions} from '../Utils/GraphQL/Mutations';
import {currentUserQueryOptions, fetchPinsQueryOptions2} from '../Utils/GraphQL/Queries';
import {createUser, fetchPins, loggedInUserQuery} from '../Utils/GraphQL/QueryAndMutationsStrings';
import {closeModalSelector, indexOffset2Selector, indexOffsetSelector, loginStateChangeSelector} from './AppSelector';
interface IProps extends IPins {
    currentUser: TCurrentUser;
    loginStateChange: boolean;
}

export class AppContainer extends React.PureComponent<IProps, any> {
// TODO: refactor put all the props filterin in there instead of splitting it in the various components
    constructor(props: IProps) {
        super(props);
        this.findUserHandler = this.findUserHandler.bind(this);
    }

    public componentWillReceiveProps(nextProps: IProps): void {

        if (nextProps.loginStateChange) {
            this.props.currentUser.refetch();
            store.dispatch(actionActivateModal(0));
            store.dispatch(actionLoginStateChange(false));
            //  this.delay(1500).then((r) => this.props.pins.loadMoreEntries());
        }
    }

    private findUserHandler(user_id: string): void {
        const likes: TLikes[] = this.props.currentUser.loggedUserImagesGraphQL.likes;
        History.push('/userImages', {id: user_id, likes});

    }

    public render(): JSX.Element {
        const {pins, currentUser} = this.props;
        const {loggedUserImagesGraphQL} = currentUser;
        // get the logged in userID otherwise assign a guest value
        const id: string = get(loggedUserImagesGraphQL, 'id', 'Guest');
        //react router docs states that component needs to be bound inside render if we need to pass props to it
        // tslint:disable-next-line
        const Main = () => <MainPage pins={ pins } id={ id } findUser={ this.findUserHandler }/>;
        // tslint:disable-next-line
        const MyImagePage = () => <MyImages userImages={ currentUser }/>;

        return (
            <div>
                <NavbarStrap id={ id }/>
                <Route exact path="/" render={ Main }/>
                <Route path="/myImages" render={ MyImagePage }/>
                <Route path="/userImages" component={ UserImages }/>
                <Route exact path="/loginDone" component={ LoginCallback }/>
            </div>
        );
    }
}

const mapStateToProps: any = createStructuredSelector({
    closeModal: closeModalSelector,
    indexOffset: indexOffsetSelector,
    loginStateChange: loginStateChangeSelector,
    indexOffset2: indexOffset2Selector

});

export const AppContainerConnected: any = compose(
    connect(mapStateToProps, undefined),
    graphql(loggedInUserQuery, currentUserQueryOptions),
    graphql(createUser, createUserMutationOptions),
    graphql(fetchPins, fetchPinsQueryOptions2)
)(AppContainer);
