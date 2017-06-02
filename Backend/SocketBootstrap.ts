import * as SocketIO from 'socket.io';

export const SocketBootstrap = (io: SocketIO.Server): object => {

    return io.on('connection', (socket: SocketIO.Socket) => {
        socket.on('room', (roomName: string) => {
            socket.join(roomName);
        });

        socket.on('message', (value: { room: string, payload: string, type: string }) => {
            console.log(value);
            io.sockets.in(value.room).emit(value.type, value.payload);
        });

        socket.on('disconnect', () => console.log('disconnected'));

    });

};
