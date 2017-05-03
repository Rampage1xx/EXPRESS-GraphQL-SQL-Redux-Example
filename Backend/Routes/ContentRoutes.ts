import * as express from 'express';
import * as path from 'path';

export const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({message: 'Not Authorized'});
};

export class ContentRoutes {

    get routes() {
        const router = express.Router();
        router.get('*', (req, res) => {
            res.sendFile(path.join(__dirname + '/../dist/index.html'));
        });
        return router;
    }
}