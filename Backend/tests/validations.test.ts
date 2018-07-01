import * as assert from 'assert';
import { Validation } from '../GraphQL/Validation';

describe('testing findImages try catch block', () =>
{

    it('should return an error  object on invalid date', async () =>
    {

        const query = await Validation.FindImage('asdafsasocs,acaoa,,,,');


        assert.deepEqual(query, query.error, 'the date should be  invalid');


    });

});
