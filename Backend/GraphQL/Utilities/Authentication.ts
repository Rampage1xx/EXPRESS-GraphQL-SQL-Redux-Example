import { Request } from 'express';

export class Authentication
{
    public static CheckIfLogged = (req: Request) =>
    {
        if (!req.isAuthenticated())
        {
            throw new Error('not authenticated');
        }

    };
}