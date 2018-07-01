import {List} from 'immutable';
import {store} from '../../../../store/Store';
import {Socket} from '../../../Core/Utils/Sockets';

import {actionNewFriendChat, actionNewFriendMessage} from './Actions';
import {IActionNewFriendMessage, INewChat, INewFriendChatSocket, INewFriendMessageSocket} from './FriendsChat.types';

export const BootStrapSocketFriendChat = (IDSelf: string) => {
    Socket.emit('ClientBootstrap', {userID: IDSelf});
    Socket.on('PrivateChat', (payload: INewFriendChatSocket) => {

        const openChat: INewChat = {
            friendID: payload.userThatStartedTheChat,
            messages: List([payload.startingMessage]),
            chatID: payload.chatID,
            friendName: payload.userNameThatStartedTheChat
        };

        Socket.emit('Chat', payload.chatID);
        store.dispatch(actionNewFriendChat(openChat));
    });

    Socket.on('FriendsMessage', (payload: INewFriendMessageSocket) => {

        const newFriendMessage: IActionNewFriendMessage = {
            message: payload.message,
            friendName: payload.userThatStartedTheChatName
        };

        store.dispatch(actionNewFriendMessage(newFriendMessage));
    });
};

export const starChatWithFriend = (payload: INewFriendChatSocket) => {
    Socket.emit('StartChatWithFriend', payload);
    Socket.emit('Chat', payload.chatID);
};

export const sendChatMessageToFriend = (payload: INewFriendMessageSocket) => {
    Socket.emit('ChatMessage', payload);
};

