import * as express from 'express';
import {ContentRoutes} from './ContentRoutes';
import {LoginRoutes} from './LoginRoutes';
import '../middleware/passport/passport';
import '../middleware/passport/twitter';
import '../middleware/passport/google';

export class BaseRoutes {

    get routes() {
        const app = express();
        app.use('/', new LoginRoutes().routes);
        app.use('/', new ContentRoutes().routes);
        return app;
    }
}