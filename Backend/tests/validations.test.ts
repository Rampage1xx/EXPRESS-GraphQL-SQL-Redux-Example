import * as assert from 'assert';
import {findImageValidation} from '../GraphQL/Validation';

describe('testing findImages try catch block', () => {

    it('should return an error  object on invalid date', async () => {
        const assertFunction = (query) =>
            assert.deepEqual(query, {error: 'not a valid date'}, 'the date should be  invalid');
        const query = await findImageValidation('asdafsasocs,acaoa,,,,');
        const query2 = await findImageValidation('34:231:21');
        assert.deepEqual(query, {error: 'not a valid date'}, 'the date should be  invalid');
        assertFunction(query2);

    });

});
