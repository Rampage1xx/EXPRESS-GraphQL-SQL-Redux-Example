import * as React from 'react';
import {CardBottom} from './CardBottom';
import {CardBodyText} from './CardBodyText';
import {mount, shallow} from 'enzyme';
import {CardDelete} from './CardDelete';
import {CardSubtitle, CardText, CardTitle} from 'reactstrap';

const title = 'title';
const description = 'description';

describe('Card Body Text', () => {
    const ShallowCardBody = shallow(<CardBodyText description={ description } title={ title }/>);
    const MountCardBody = mount(<CardBodyText description={ description } title={ title }/>);

    it('renders correctly the tile', () => {
        expect(ShallowCardBody.contains(<CardTitle>title</CardTitle>)).toBe(true);
        expect(ShallowCardBody.contains(<CardText>description</CardText>)).toBe(true);
    });

    it('should mount in a full DOM', () => {

        expect(MountCardBody.find(CardBodyText)).toHaveLength(1);
        expect(MountCardBody.props().description).toEqual(description);
        expect(MountCardBody.props().title).toEqual(title);
    });

    it('should not render', () => {
        const MountDeleteCard = shallow(<CardDelete deletePin={ false }/>);
        expect(MountDeleteCard.isEmptyRender()).toEqual(true);
    });

});

describe('card bottom tests', () => {
    const dummyFunction = (): any => {
        return 'test';
    };
    const wrapperShallowCardBottom = shallow(
        <CardBottom avatar={ 'avatar' } totalLikes={ 2 } like={ true } userName={ 'user' }
                    findUserHandler={ dummyFunction } likeHandler={ dummyFunction }/>
    );
    it('should render total likes and like status', () => {
        expect(wrapperShallowCardBottom.find('.faLightGreen').exists()).toBe(true);
        expect(wrapperShallowCardBottom.find('.totalLikes__card__p').text()).toBe(' 2');

    });
});
