import * as bodyParser from 'body-parser';
import * as Express from 'express';
import * as session from 'express-session';
import * as passport from 'passport';
import {BaseRoutes} from '../Routes/baseRoutes';
import * as expressGraphQL from 'express-graphql';
import {RootSchema} from '../GraphQL/RootGraphQL';
import * as SequelizeStore from 'connect-session-sequelize';
import {connection} from '../database/SequelizeTables';
import * as  compression from 'compression';

const sessionStorage = SequelizeStore(session.Store);
const corsOptions =  {
    credentials: true,
    optionsSuccessStatus: 200,
    origin: 'http://react:5000'
};

const sessionParameters = {
    secret: 'keyboard cat',
    store: new sessionStorage({db: connection}),
    resave: false,
    proxy: true,
    saveUninitialized: 'false',
    cookie: {maxAge: 6000000},
    checkExpirationInterval: 15 * 60 * 1000,
    expiration: 24 * 60 * 60 * 30
};

export class BaseMiddleware {

    static get Configuration() {
        const app = Express();
        app.use(session(sessionParameters));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(compression());
        //app.use(cors(corsOptions));
        app.use(passport.initialize());
        app.use(passport.session());
        app.use('/graphql', expressGraphQL({
            schema: RootSchema,
            graphiql: true
        }));
        app.use('/', new BaseRoutes().routes);
        return app;
    }
}