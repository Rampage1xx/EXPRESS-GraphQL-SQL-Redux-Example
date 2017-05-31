import * as express from 'express';
import './database/Redis';
import './database/Sequelize/SequelizeConfiguration';
import {BaseMiddleware} from './middleware/base';

export const app = express();

app.use(express.static('dist'));

app.use(BaseMiddleware.Configuration);

export const closeServer = app.listen(3000, () => {
    console.log('server running');
});

