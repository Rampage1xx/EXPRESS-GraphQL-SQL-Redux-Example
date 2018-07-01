import * as SocketIO from 'socket.io';


interface ICallbackRes
{
    sentData: object | string;

    data?: object | string
}

type TCallback = (err: string | null, res: ICallbackRes | null) => void;


interface IMessage
{
    room: string,

    payload: string,

    type: string
}


export const SocketBootstrap = (io: SocketIO.Server): object =>
{

    return io.on('connection', (socket: SocketIO.Socket) =>
    {
        socket.on('room', (roomName: string, callback: TCallback) =>
        {
            socket.join(roomName);
            callback(null, { sentData: roomName });
        });

        socket.on('roomLeave', (value: string, callback: TCallback) =>
        {
            socket.leave(value);
            callback(null, { sentData: value });

        });

        socket.on('message', (value: IMessage, callback: TCallback) =>
        {
            io.sockets.in(value.room).emit(value.type, value.payload);
            callback(null, { sentData: value });

        });

        socket.on('disconnect', () => console.log('disconnected'));

        socket.on('Chat', (chatID: string, callback: TCallback) =>
        {
            socket.join(chatID);
            callback(null, { sentData: chatID });

        });

        socket.on('ClientBootstrap', (parameters: { userID: string }, callback: TCallback) =>
        {
            socket.join(parameters.userID);
            // TODO:sets user online in db
            callback(null, { sentData: parameters });

        });

        socket.on('startChatWithFriend', (payload: INewFriendChat, callback: TCallback) =>
        {
            io.sockets.in(payload.userIDReceiver).emit('PrivateChat', payload);
            socket.join(payload.chatID);
            callback(null, { sentData: payload });

        });

        socket.on('ChatMessage', (payload: INewFriendMessage, callback: TCallback) =>
        {
            io.sockets.in(payload.chatID).emit('FriendMessage', payload);
            callback(null, { sentData: payload });

        });
    });

};

interface INewFriendChat
{
    chatID: string;

    startingMessage: string;

    userIDReceiver: string;

    userThatStartedTheChat: string;

    userNameThatStartedTheChat: string;
}

interface INewFriendMessage
{
    message: string;

    userThatStartedTheChatID: string;

    userThatStartedTheChatName: string;

    userIDReceiver: string;

    chatID: string;
}
