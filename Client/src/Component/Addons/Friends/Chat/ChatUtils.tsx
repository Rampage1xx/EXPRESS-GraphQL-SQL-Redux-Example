import * as React from 'react';
import {INewChat} from './FriendsChat.types';

export const createChat = (openChatParams: INewChat) => {

    const {friendName, messages, friendID, chatID} = openChatParams;

    return (
        <div key={`${friendID + friendName}`}>

        </div>
    );

};

