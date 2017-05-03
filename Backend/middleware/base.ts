import * as bodyParser from 'body-parser';
import * as Express from 'express';
import * as session from 'express-session';
import * as passport from 'passport';
import {BaseRoutes} from '../Routes/baseRoutes';
import * as expressGraphQL from 'express-graphql';
import {RootSchema} from '../GraphQL/GraphQL';
import * as SequelizeStore from 'connect-session-sequelize';
import {connection} from '../database/Tables';
import * as  compression from 'compression';

const sessionStorage = SequelizeStore(session.Store);

export class BaseMiddleware {

    static get Configuration() {
        const app = Express();
        app.use(session({
            // both expiration and cookie max age for browser compatibility
            secret: 'keyboard cat',
            store: new sessionStorage({
                db: connection
            }),
            resave: false, // we support the touch method so per the express-session docs this should be set to false
            proxy: true, // if you do SSL outside of node.
            saveUninitialized: 'false',
            cookie: {maxAge: 6000000},
            checkExpirationInterval: 15 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
            expiration: 24 * 60 * 60 * 100  // The maximum age (in milliseconds) of a valid session.
        }));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(compression());
        app.use(passport.initialize());
        app.use(passport.session());
        app.use ('/graphql', expressGraphQL({
            schema: RootSchema,
            graphiql: true
        }));
        app.use('/', new BaseRoutes().routes)
        return app;
    }
}