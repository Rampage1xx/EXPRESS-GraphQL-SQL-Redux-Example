import * as bodyParser from 'body-parser';
import * as  compression from 'compression';
import * as SequelizeStore from 'connect-session-sequelize';
import * as cors from 'cors';
import * as Express from 'express';
import * as expressGraphQL from 'express-graphql';
import * as session from 'express-session';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as passport from 'passport';
import {connection} from '../database/Sequelize/SequelizeConfiguration';
import '../database/Sequelize/SequelizeConnect';
import {RootSchema} from '../GraphQL/RootGraphQL';
import {BaseRoutes} from '../Routes/baseRoutes';

const sessionStorage = SequelizeStore(session.Store);
const corsOptions = {
    credentials: true,
    optionsSuccessStatus: 200,
    origin: 'http://localhost:80',
    methods: ['GET', 'POST']
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
        app.use(helmet());
        app.use(session(sessionParameters));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(compression());
        app.use(morgan('tiny'));
        app.use(cors(corsOptions));
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
