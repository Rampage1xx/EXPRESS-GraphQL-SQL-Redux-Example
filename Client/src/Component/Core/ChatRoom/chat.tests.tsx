import {List, Map} from 'immutable';
const example = Map({
    parameter: List([])
});

describe('testing immutable', () => {

    it('should set in a map', () => {

        const container =  Map({parameter3: [], parameter4: []});
        const set1 = example.setIn(['parameter'], Map({ciao:'ciao'}));
        const set2 = set1.get('parameter').concat(Map({ciao2:'ciao2'}))

    });

});
