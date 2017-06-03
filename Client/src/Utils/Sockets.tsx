import * as  io from 'socket.io-client';
import {actionJoinedRoom, actionSendMessage} from '../Component/ChatRoom/Logic/ChatActions';
import {store} from '../store/store';
export const Socket = io();

export const BootStrapSocket = (roomName: string) => {
    // join room
    Socket.emit('room', roomName, () => {
// tslint:disable-next-line
        console.log('left channel?');
        store.dispatch(actionJoinedRoom(roomName));
    });
    // subscribe to messages
    Socket.on('message', (message: string) => {
        // tslint:disable-next-line
        console.log('Incoming message:', message);
        store.dispatch(actionSendMessage(message));
    });
};

export const SendMessage = (roomName: string, message: string) => {
    // emit message
    Socket.emit('message', {room: roomName, payload: message, type: 'message'});
};

export const LeaveChannel = (roomName: string) => {
    // leave room
    Socket.emit('roomLeave', roomName);
};
