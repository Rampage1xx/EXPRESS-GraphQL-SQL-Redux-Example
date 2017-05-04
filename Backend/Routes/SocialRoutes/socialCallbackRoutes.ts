import * as express from 'express';
import * as passport from 'passport';

export class SocialCallbackRoutes {
    constructor(private socialArray: string[]) {
    }

    private  createAuthentication(name: string) {
        return passport.authenticate(name,
            {failureRedirect: '/', successRedirect: '/loginDone'});
    }

    get routes() {
        const router = express.Router({mergeParams: true});
        // create the routes
        this.socialArray.map((socialName) =>
            router.get(`/auth/${socialName}/callback`, this.createAuthentication(socialName))
        );
        return router;
    }
}