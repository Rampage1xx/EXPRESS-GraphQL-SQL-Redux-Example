import * as  io from 'socket.io-client';
import {actionJoinedRoom, actionSendMessage} from '../Component/ChatRoom/Logic/ChatActions';
import {store} from '../store/store';

/// DEPRECATED

export const Socket = io();

export const BootStrapSocketRoom = (roomName: string) => {
    // join room
    Socket.emit('room', roomName, () => {
        console.log('left channel?');
        store.dispatch(actionJoinedRoom(roomName));
    });
    // subscribe to messages
    Socket.on('message', (message: string) => {
        console.log('Incoming message:', message);
        store.dispatch(actionSendMessage(message));
    });

    //join the user channel room
    Socket.emit('Users');
};

export const SendMessage = (roomName: string, message: string) => {
    // emit message
    Socket.emit('message', {roomName, payload: message, type: 'message'});
};

export const LeaveChannel = (roomName: string) => {
    // leave room
    Socket.emit('roomLeave', roomName);
};
