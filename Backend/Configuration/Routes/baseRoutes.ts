import * as express from 'express';
import { ContentRoutes } from './ContentRoutes';
import { LoginRoutes } from './LoginRoutes';
import '../Middleware/passport/passport';
import '../Configuration/passport/twitter';
import '../Configuration/passport/google';

export class BaseRoutes
{

    static get routes ()
    {
        const app = express();
        app.use('/', LoginRoutes.routes);
        app.use('/', ContentRoutes.routes);
        return app;
    }
}