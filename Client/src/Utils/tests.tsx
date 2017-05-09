import * as React from 'react';
import {GenerateMasonry} from './GenerateMasonry';
import {imagesArrayTest, likesArrayTest, user_id} from '../../tests/mocks/variables';
import {shallow} from 'enzyme';
import {Row} from '../Component/Row/Row';
import {addLikeStatusToArray} from './GraphQL/Queries';

const fakeFunction = (index: number) => void {};
const fakeFindUser = () => void {};
const {imagesListGraphQL} = imagesArrayTest.data;

describe('testing masonry creation', () => {

    it(' should generate a  masonry of 24 pieces', () => {
        const result = GenerateMasonry({
            id: user_id,
            deleteCardFunction: fakeFunction,
            deletePin: false,
            images: imagesListGraphQL
        });
        expect(result.length).toBe(24);
        expect(result[11].props.LoggedInUserID)
            .toContain('b7a302ae-6acf-4bf1-8bf6-bba0143a6d5c');
    });

    it('should inject an array of images into the row component', () => {
        const shallowRenderRow = shallow(<Row pins={ imagesListGraphQL } findUser={ fakeFindUser} id='test'/>);
        expect((shallowRenderRow.props().children.length)).toBe(24);
    });
});

describe('testing apollo functions', () => {
    it('should add like status to images', () => {
        const result = addLikeStatusToArray(imagesListGraphQL, likesArrayTest);
        expect(result[1].like).toBe(true);
    });

    it('should return an empty array', () => {
        const result = addLikeStatusToArray([], []);
        expect(result).toEqual([]);
    });

});