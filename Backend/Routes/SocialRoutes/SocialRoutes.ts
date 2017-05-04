import * as express from 'express';
import * as passport from 'passport';

export class SocialRoutes {
    public socials: string[];
    public route: string;

    constructor(public socialNames: string[], public routeName: string) {
        this.socials = socialNames;
        this.route = routeName;

    }

    get routes() {
        const router = express.Router({});
        this.socials.map((social, index) => {
            if (social === 'google') {
                // google login needs a special scope argument to be passed
                router.get(`/google/${this.route}`, passport.authenticate(social, {
                    scope: ['https://www.googleapis.com/auth/plus.login',
                        'https://www.googleapis.com/auth/plus.profile.emails.read']
                }));
            } else {
                router.get(`/${social}/${this.route}`, passport.authenticate(social));
                /// requestType(GET,POST,PUT,DELETE)
                // example result router.get('/twitter/login', passport.authenticate(twitter)
            }
        });
        return router;
    }

}