import * as React from 'react';
import {INewChat} from './FriendsChat.types';

interface IProps {
    friend: INewChat;

}

export class FriendChat extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);

    }

    public render() {
        const {friendName} = this.props.friend

        return (

            <div>
                {friendName}
            </div>

        );

    }

}
