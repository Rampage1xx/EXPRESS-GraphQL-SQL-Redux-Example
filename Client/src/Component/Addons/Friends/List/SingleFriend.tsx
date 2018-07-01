import * as React from 'react';
import {ISingleFriend} from './FriendList.types';

interface IProps {
    friend: ISingleFriend

}

export class SingleFriend extends React.Component<IProps, any> {

    private openChat() {
       // this.props.friend.id;
    }

    public render() {
        const {friend} = this.props;
        const online = friend.online ? 'online' : 'offline';

        return (
            <div>
                <p> {online} </p>
                <p> {friend.friendName}</p>
            </div>

        );
    }
}
;
