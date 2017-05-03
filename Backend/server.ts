import * as express from 'express';
import {BaseMiddleware} from './middleware/base';
import './database/Tables';
import './database/Redis';

export const app = express();

app.use(express.static('dist'));

app.use(BaseMiddleware.Configuration);
/* si provaaa
/*saas
process.on('SIGINT', () => {
connection.close();
console.log('closing database connections')
});
*/


export const server = app.listen(3000, () => {
    console.log('server running');
});

