import {List} from 'immutable';

// sockets

export interface INewFriendMessageSocket {
    message: string;
    userThatStartedTheChatID: string;
    userThatStartedTheChatName: string;
    userIDReceiver: string;
    chatID: string;
}

export interface INewFriendChatSocket {
    chatID: string;
    startingMessage: string;
    userIDReceiver: string;
    userThatStartedTheChat: string;
    userNameThatStartedTheChat: string;
}

export interface IType {
    type: string;
}
//Actions and store reducers

// new chat

export interface INewChat {
    friendID: string;
    messages: List<string>;
    chatID: string;
    friendName: string;
}

export interface IActionNewFriendChatRe {
    type: string, newChat: INewChat
}

// new message from friend

export interface IActionNewFriendMessage {
    message: string; friendName: string;
}

export interface IActionNewFriendMessageRe extends IType {
    newFriendMessagePayload: IActionNewFriendMessage
}
