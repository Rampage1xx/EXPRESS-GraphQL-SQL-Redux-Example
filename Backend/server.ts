import * as express from 'express';
import {BaseMiddleware} from './middleware/base';
import './database/SequelizeTables';
import './database/Redis';
import * as http from 'http';
export const app = express();

export const server = http.createServer(app);

//const io = socketIO(server);
app.use(express.static('dist'));

app.use(BaseMiddleware.Configuration);

server.listen(3000, () => {
    console.log('server running');
});