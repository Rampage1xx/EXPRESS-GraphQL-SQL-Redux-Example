import * as express from 'express';
import * as passport from 'passport';

import {twitter} from '../Strings';
import {SocialCallbackRoutes} from './SocialRoutes/socialCallbackRoutes';
import {SocialRoutes} from './SocialRoutes/SocialRoutes';

export class LoginRoutes {

    get routes() {
        const router = express.Router({mergeParams: true});
        /// CREATE
        //  router.use('/', new SocialRoutes([twitter, 'google'], 'create', [twitterCreate, 'googleCreate'], 'get').routes);
        // example result router.post('/twitter/login', passport.authenticate(createTwitter),
        // twitterCreate refers to the passport strategy

        /// LOGIN

        router.use('/', new SocialRoutes([twitter, 'google'], 'login').routes);
        // example result router.get('/twitter/login', passport.authenticate(twitter)
        router.post('/login', passport.authenticate('local'), (req, res) => {
            res.status(200).json({login: true});
        });

        /// CALLBACKS
        router.use('/', new SocialCallbackRoutes([twitter, 'google']).routes);

        /// LOGOUT
        router.get('/logout', (req, res) => {
            req.logout();
            res.status(200).json({logout: true});
        });
        return router;
    }

}