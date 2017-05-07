import * as React from 'react';
import {mount, shallow} from 'enzyme';
import {CardBodyText} from '../src/Component/Card/CardBodyText';
import {CardSubtitle, CardText, CardTitle} from 'reactstrap';
import {CardDelete} from '../src/Component/Card/CardDelete';
import {CardBottom} from '../src/Component/Card/CardBottom';
import {addLikeStatusToArray} from '../src/Utils/GraphQL/Queries';
import {imagesArrayTest, likesArrayTest} from './mocks/variables';
import {get} from 'lodash';

const title = 'title';
const description = 'description';
const fetchPins2 = `
query imageList ($indexOffset: String!){
  imagesListGraphQL2(indexOffset: $indexOffset){
    id,
    title,
    url,
    description,
    userName,
    user_id,
    totalLikes,
    avatar,
    created_at
  }
}
`;
describe('Card Body Text', () => {
    const wrapperMountCardBody = mount(<CardBodyText description={ description } title={ title }/>);
    const wrapperShallowCardBody = shallow(<CardBodyText description={ description } title={ title }/>);
    const wrapperMountDeleteCard = shallow(<CardDelete deletePin={ false }/>);

    it('renders correctly the tile', () => {
        expect(wrapperShallowCardBody.contains(<CardTitle>title</CardTitle>)).toBe(true);
        expect(wrapperShallowCardBody.contains(<CardText>description</CardText>)).toBe(true);
    });

    it('should mount in a full DOM', () => {
        expect(wrapperMountCardBody.find(CardBodyText)).toHaveLength(1);
        expect(wrapperMountCardBody.props().description).toEqual(description);
        expect(wrapperMountCardBody.props().title).toEqual(title);
    });

    it('should not render', () => {
        expect(wrapperMountDeleteCard.isEmptyRender()).toEqual(true);
    });


});

describe('card bottom tests', () => {
    const dummyFunction = (): void => {
    };
    const wrapperShallowCardBottom = shallow(
        <CardBottom avatar={ 'avatar' } totalLikes={ 2 } like={ true } userName={ 'user' }
                    findUserHandler={dummyFunction} likeHandler={ dummyFunction }/>
    );
    it('should render total likes and like status', () => {
        expect(wrapperShallowCardBottom.find('.faLightGreen').exists()).toBe(true);
        expect(wrapperShallowCardBottom.find('.totalLikes__card__p').contains(2)).toBe(true);

    });
});

describe('testing apollo functions', () => {
    const {imagesListGraphQL} = imagesArrayTest.data
    it('should add like status to images',  () => {
      const result =  addLikeStatusToArray(imagesListGraphQL, likesArrayTest);
      expect(result[1].like).toBe(true);
    });

    it('should return an empty array', () => {
        const result = addLikeStatusToArray([], [])
        expect(result).toEqual([])
    });
    it('should fetch created at', () => {
       const result = get(imagesListGraphQL,[0,'created_at'])
        console.log(result)
    })
});