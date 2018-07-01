import 'express';

interface User
{
    id: string;

    userName: string

    avatar?: string

    [_: string]: any;
}

declare global
{
    namespace Express
    {
        interface Request
        {
            user?: User
        }
    }
}
