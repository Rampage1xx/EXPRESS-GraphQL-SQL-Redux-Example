import {Map} from 'immutable';
import {NEW_FRIEND_CHAT, NEW_FRIEND_MESSAGE} from './Actions';
import {IActionNewFriendChatRe, IActionNewFriendMessageRe} from './FriendsChat.types';

const InitialChatStore: Map<string, any> = Map({});

const chatStore = (state: Map<string, any> = InitialChatStore, action: IAction) => {
    switch (action.type) {
        case NEW_FRIEND_CHAT:
            return state.concat({[action.newChat.friendName]: action.newChat});

        case NEW_FRIEND_MESSAGE:
            return state.getIn([`${action.newFriendMessagePayload.friendName}`, 'messages'])
                .concat(action.newFriendMessagePayload.message);

        default:
            return state;
    }

};

interface IAction extends IActionNewFriendChatRe, IActionNewFriendMessageRe {
}
