import {
    IActionNewFriendChatRe, IActionNewFriendMessage, IActionNewFriendMessageRe, INewChat
} from './FriendsChat.types';

export const NEW_FRIEND_CHAT: string = 'NEW_FRIEND_CHAT';
export const NEW_FRIEND_MESSAGE: string = 'NEW_FRIEND_MESSAGE';

export const actionNewFriendChat = (newChat: INewChat): IActionNewFriendChatRe => ({type: NEW_FRIEND_CHAT, newChat});

export const actionNewFriendMessage = (newFriendMessagePayload: IActionNewFriendMessage): IActionNewFriendMessageRe => {
    return ({type: NEW_FRIEND_MESSAGE, newFriendMessagePayload});
};


