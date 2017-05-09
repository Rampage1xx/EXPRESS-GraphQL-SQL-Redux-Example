import {findImagesSequelize} from '../database/Controller';
import * as assert from 'assert';


xdescribe('testing findImages try catch block', () => {

    xit('should return an error  object on invalid date',  async () => {
        const assertFunction = (query) =>
            assert.deepEqual(query, {error: 'not a valid date'}, 'the date should be  invalid');
        const query = await findImagesSequelize('asdafsasocs,acaoa,,,,');
        const query2 = await findImagesSequelize('34:231:21');
        assert.deepEqual(query, {error: 'not a valid date'}, 'the date should be  invalid');
        assertFunction(query2);

    });

});
