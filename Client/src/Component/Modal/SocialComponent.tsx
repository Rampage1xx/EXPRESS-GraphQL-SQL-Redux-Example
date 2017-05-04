import * as React from 'react';
import {store} from '../../store/Store';
import {actionCloseModal} from '../../Actions/ActionCreators';

interface IProps {
    socialsArray: string[]
}

export class SocialComponent extends React.Component<IProps, any> {
    private socials: any;
    private group: string[];

    constructor(props: IProps) {
        super(props);
        this.socials = {};
        this.group = this.props.socialsArray;
        this.group.forEach((social) => {
            this.socials[social] = this.startAuthentication.bind(this, social);
        });
    }

    private startAuthentication(social: string) {
        window.open(`http://localhost:3000/${social}/login`, `login`, 'height=200,width=200');
        store.dispatch(actionCloseModal(true))
    }

    public render() {
        return (
            <div>
                <div role='button' className='fa fa-twitter-square fa-3x' aria-hidden='true'
                     onClick={ this.socials.twitter }/>
                <div role='button' className='fa fa-google-plus-square fa-3x' aria-hidden='true'
                     onClick={ this.socials.google }/>
            </div>
        );
    }
}