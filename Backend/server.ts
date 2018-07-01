import * as express from 'express';
import * as http from 'http';
import * as socketIO from 'socket.io';
//todo imports with side effects should be moved to an asyncronous boot function
import './database/Redis';
import './database/Sequelize/SequelizeConfiguration';
import { Middleware } from './Configuration/Middleware/Middleware';
import { SocketBootstrap } from './SocketBootstrap';


const port = process.env.port || 3000;

export const app = express();

const server = http.createServer(app);

const io: SocketIO.Server = socketIO(server);

SocketBootstrap(io);

app.use(express.static('dist'));

app.use(Middleware.Configuration);

export const ServerInstance = server.listen(port, () =>
{
    console.log(`server running on port: ${port}`);
});

