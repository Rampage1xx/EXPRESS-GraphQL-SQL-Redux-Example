import * as express from 'express';
import {BaseMiddleware} from './middleware/base';
import './database/SequelizeTables';
import './database/Redis';
export const app = express();

app.use(express.static('dist'));
app.use((req,res,next) => {
    console.log(req, Object.getOwnPropertyNames(req))
    next()
})
app.use(BaseMiddleware.Configuration);

export const closeServer = app.listen(3000, () => {
    console.log('server running');
});