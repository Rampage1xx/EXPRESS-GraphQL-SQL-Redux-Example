import {Map} from 'immutable';
import {IActionJoinedRoom, IActionNewMessage, IActionNewUser} from './interfaces';

export const SEND_MESSAGE: string = 'SEND_MESSAGE';
export const JOINED_ROOM: string = 'JOINED_ROOM';
export const NEW_MESSAGE: string = 'NEW_MESSAGE';
export const NEW_USER: string = 'NEW_USER';

export const actionSendMessage = (sendMessage: string) => ({type: SEND_MESSAGE, sendMessage});

export const actionNewMessage: IActionNewMessage = ({newMessage, roomName}) =>
    ({type: NEW_MESSAGE, newMessage, roomName});

export const actionJoinedRoom: IActionJoinedRoom = (roomName: string) => {
    return (
        {
            type: JOINED_ROOM,
            newRoom: Map({[roomName]: {messages: [], users: []}})
        }
    );
};

export const actionNewUser: IActionNewUser = ({roomName, userName}) => ({type: NEW_USER, roomName, userName});
