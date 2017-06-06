import {config} from 'dotenv';
import * as express from 'express';
import * as http from 'http';
import * as socketIO from 'socket.io';
import './database/Redis';
import './database/Sequelize/SequelizeConfiguration';
import {BaseMiddleware} from './middleware/base';
import {SocketBootstrap} from './SocketBootstrap';
config();
export const app = express();
const server = http.createServer(app);

const io: SocketIO.Server = socketIO(server);
//
//io.on('connection', (socket) => console.log('user connected'));

SocketBootstrap(io);

app.use(express.static('dist'));

app.use(BaseMiddleware.Configuration);

export const closeServer = server.listen(3000, () => {
    console.log('server running');
});

