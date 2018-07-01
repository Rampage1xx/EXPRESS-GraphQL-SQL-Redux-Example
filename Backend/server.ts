import { config } from 'dotenv';
import * as express from 'express';
import * as http from 'http';
import * as socketIO from 'socket.io';
import './database/Redis';
import './database/Sequelize/SequelizeConfiguration';
import { Middleware } from './Configuration/Middleware/Middleware';

import { SocketBootstrap } from './SocketBootstrap';

config();
export const app = express();
const server = http.createServer(app);

const io: SocketIO.Server = socketIO(server);
//
//io.on('connection', (socket) => console.log('user connected'));

SocketBootstrap(io);

app.use(express.static('dist'));

app.use(Middleware.Configuration);

export const closeServer = server.listen(3000, () =>
{
    console.log('server running');
});

