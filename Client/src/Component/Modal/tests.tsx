import * as React from 'react';
import {mount, shallow} from 'enzyme';
import {ModalComponent} from './ModalComponent';
import {OpenModalButton} from './AddOns/OpenModalButton';
declare const describe;
declare const it;
declare const expect;
const fakeToggle = () => void  {};

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