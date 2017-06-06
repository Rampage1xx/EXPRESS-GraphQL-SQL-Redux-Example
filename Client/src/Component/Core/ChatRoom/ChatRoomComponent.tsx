import {RouteComponentProps} from '@types/react-router';
import {Map} from 'immutable';
import * as React from 'react';
import {SendMessageForm} from '../Form/FormContainer';
import {SendMessageField} from '../Form/SendMessageField';
import {LeaveChannel, SendMessage} from '../Utils/Sockets';
interface ILocationProps {
    roomName: string;
}

export class ChatRoomComponent extends React.Component<RouteComponentProps<any>, any> {
    private locationState: ILocationProps;
    private messageHistory: string[] = [];

    constructor(props: RouteComponentProps<any>) {
        super(props);
        this.sendMessage = this.sendMessage.bind(this);
        this.messageLogs = this.messageLogs.bind(this);
        this.locationState = props.location.state as ILocationProps;
       // BootStrapSocket(this.locationState.roomName);

    }

    private messageLogs(message: string): void {
        this.messageHistory.push(message);
    }

    public componentWillUnmount(): void {
        LeaveChannel(this.locationState.roomName);
    }

    private sendMessage(formProps: Map<string, string>): void {
        const messageContent: string = formProps.get('message');

        // sends a message inside the room
        SendMessage(this.locationState.roomName, messageContent);
    }

    public render(): JSX.Element {

        return (
            <SendMessageForm SubmitForm={ this.sendMessage}>
                <SendMessageField/>
            </SendMessageForm>
        );

    }
}


