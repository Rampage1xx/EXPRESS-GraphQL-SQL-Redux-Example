import * as SocketIO from 'socket.io';

export const SocketBootstrap = (io: SocketIO.Server): object => {

    return io.on('connection', (socket: SocketIO.Socket) => {
        socket.on('room', (roomName: string) => {
            socket.join(roomName);
        });

        socket.on('roomLeave', (value: string) => {
            socket.leave(value);
        });

        socket.on('message', (value: { room: string, payload: string, type: string }) => {
            console.log(value);
            io.sockets.in(value.room).emit(value.type, value.payload);
        });

        socket.on('disconnect', () => console.log('disconnected'));

        socket.on('Chat', (chatID: string) => {
            socket.join(chatID);
        });

        socket.on('ClientBootstrap', (parameters: { userID: string }) => {
            socket.join(parameters.userID);
            // TODO:sets user online in db
        });

        socket.on('startChatWithFriend', (payload: INewFriendChat) => {
            io.sockets.in(payload.userIDReceiver).emit('PrivateChat', payload);
            socket.join(payload.chatID);
        });

        socket.on('ChatMessage', (payload: INewFriendMessage) => {
            io.sockets.in(payload.chatID).emit('FriendMessage', payload);
        });
    });

};

interface INewFriendChat {
    chatID: string;
    startingMessage: string;
    userIDReceiver: string;
    userThatStartedTheChat: string;
    userNameThatStartedTheChat: string;
}

interface INewFriendMessage {
    message: string;
    userThatStartedTheChatID: string;
    userThatStartedTheChatName: string;
    userIDReceiver: string;
    chatID: string;
}
