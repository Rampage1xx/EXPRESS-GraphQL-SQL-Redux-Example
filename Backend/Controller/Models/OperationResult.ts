export class OperationResult
{
    constructor (
        public success: boolean,
        public id: string | number,
        public error?: string,
    )
    {

    }
}