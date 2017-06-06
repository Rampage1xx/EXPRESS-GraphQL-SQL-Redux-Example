import * as React from 'react';
import {ISingleFriend} from './FriendList.types';
import {SingleFriend} from './SingleFriend';

export const createFriendList = (FriendsArray: ISingleFriend[]): JSX.Element => {
    const Friends = FriendsArray.map(friend => <SingleFriend friend={friend} key={ friend.id}/>);

    return (
        <div className='friendList__Content'>
            {Friends}
        </div>
    );
};


export const FriendListRequest = () => {}
