import {mount} from 'enzyme';
import {List} from 'immutable';
import * as React from 'react';
import {FriendChat} from './FriendChat';
import {INewChat} from './FriendsChat.types';

describe('testing chat components', () => {
    const friendObj: INewChat = {chatID: '123', messages: List(['abc', 'defg']), friendID: '3444', friendName: 'Conker'};
    const mountFriendChat = mount(<FriendChat friend={friendObj}/>);

    it('should boot up', () => {
    });
});
