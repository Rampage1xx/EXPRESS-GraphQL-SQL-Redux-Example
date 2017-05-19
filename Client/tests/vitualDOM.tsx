import {mount, shallow} from 'enzyme';
import * as React from 'react';
import {CardSubtitle, CardText, CardTitle, ModalHeader} from 'reactstrap';
import {CardBodyText} from '../src/Component/Card/CardBodyText';
import {CardBottom} from '../src/Component/Card/CardBottom';
import {CardDelete} from '../src/Component/Card/CardDelete';
import {OpenModalButton} from '../src/Component/Modal/AddOns/OpenModalButton';
import {ModalComponent} from '../src/Component/Modal/ModalComponent';
import {Row} from '../src/Component/Row/Row';
import {GenerateMasonry} from '../src/Utils/GenerateMasonry';
import {addLikeStatusToArray} from '../src/Utils/GraphQL/Queries';
import {imagesArrayTest, likesArrayTest, user_id} from './mocks/variables';
const {imagesListGraphQL} = imagesArrayTest.data;
const title = 'title';
const description = 'description';
const fakeFunction = (index: number) => void {};
const fakeToggle = () => void  {};
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
        const shallowRenderRow = shallow(<Row pins={ imagesListGraphQL }/>);
        expect((shallowRenderRow.props().children.length)).toBe(24);
    });
});

describe('testing modal functionality', () => {
    const mountModal = mount(<ModalComponent activeModal={ 9 } name={ 'test' }/>);
    const shallowModalButton = shallow(<OpenModalButton toggle={ fakeToggle } name={ 'buttonTest' } invisible={ false } />)
    it('should assert modal components existence and the props rendered', () => {
        expect(mountModal.exists()).toBe(true);
        expect(mountModal.children().length).toBe(2);
        expect(mountModal.find(OpenModalButton).find('div').text()).toBe('test')
        expect(shallowModalButton.text()).toBe('buttonTest')
    });

    it('should change modal state on click', () => {
        expect(mountModal.state().modal).toBe(false);
        mountModal.find(OpenModalButton).find('div').simulate('click');
        expect(mountModal.state().modal).toBe(true);

    });

});
