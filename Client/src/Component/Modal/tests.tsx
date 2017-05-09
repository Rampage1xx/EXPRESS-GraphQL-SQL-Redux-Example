import * as React from 'react';
import {mount, shallow} from 'enzyme';
import {ModalComponent} from './ModalComponent';
import {OpenModalButton} from './AddOns/OpenModalButton';
import {CreateAccountModalAddOn} from './AddOns/CreateAccountModalAddOn';
import {Provider} from 'react-redux';
import {store} from '../../store/Store';

const fakeToggle = () => void  {};

describe('testing modal functionality', () => {
    const mountModal = mount(<ModalComponent activeModal={ 9 } name={ 'test' }/>);
    const shallowModalButton = shallow(<OpenModalButton toggle={ fakeToggle } name={ 'buttonTest' }
                                                        invisible={ false }/>);

    const mountModalAddon = mount(
        <Provider store = { store }>
        <CreateAccountModalAddOn/>
        </Provider>
        );
    it('should assert modal components existence and the props rendered', () => {
        expect(mountModal.exists()).toBe(true);
        expect(mountModal.children().length).toBe(2);

    });

    it('should render the props', () => {
        expect(mountModal.find(OpenModalButton).find('div').text()).toBe('test');
        expect(shallowModalButton.text()).toBe('buttonTest');
    });

    it('should change modal state on click', () => {
        expect(mountModal.state().modal).toBe(false);
        mountModal.find(OpenModalButton).find('div').simulate('click');
        expect(mountModal.state().modal).toBe(true);

    });

    it('should render modal AddOns', () => {
        expect(mountModalAddon.find('form')).toBeTruthy()
    })

});