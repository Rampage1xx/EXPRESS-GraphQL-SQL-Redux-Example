import { List, Map } from 'immutable';
const array22 = List([2, 2, 2, 2]);
const listInMap: Map<string, string | List<number>> = Map({
    casa: 'casa',
    listNested: List([[{a:1}], 1, 1, 1]),
    listNested2: List([1, 1, 1, 1])

});

describe('trying operators', () => {
    it('should concat', () => {
        const try11 = (listInMap as any).get('listNested').concat(array22);
        listInMap.withMutations((list) => {
        //    console.log(list.get('listNested').concat(array22));
        });
        //   expect((listInMap as any).get('listNested').concat(array22).get('listNested2').concat(array22)).toEqual(List([1, 1, 1, 1, 2,
        // 2, 2, 2]))
    });
});
