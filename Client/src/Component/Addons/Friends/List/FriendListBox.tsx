import * as React from 'react';
import './FriendList.css';
import {ISingleFriend} from './FriendList.types';
import {createFriendList} from './ListUtils';

interface IProps {
    FriendList: ISingleFriend[];
}

interface IState {
    showFriends: boolean;
}

export class FriendListBox extends React.Component<IProps, IState> {
    private FriendsToRender: JSX.Element;

    constructor(props) {
        super(props);
        this.FriendsToRender = createFriendList(props.FriendList);
        this.state = {showFriends: false};
        this.showFriendsToggle = this.showFriendsToggle.bind(this);
    }



    private showFriendsToggle() {
        this.setState({showFriends: !this.state.showFriends});

    }

    public render(): JSX.Element {
        const renderFriends = this.state.showFriends ? this.props.children : undefined;

        return (
            <div className='friendList__box'>
                <div className='friendList__X' onClick={this.showFriendsToggle}> X</div>
                <div className='friendList__Header'>
                    <div> Friend List</div>
                </div>
                {renderFriends}
            </div>
        );

    }

}
