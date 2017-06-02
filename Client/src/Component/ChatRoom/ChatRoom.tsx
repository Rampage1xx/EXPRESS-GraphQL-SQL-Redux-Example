import {Map} from 'immutable';
import * as React from 'react';
import * as io from 'socket.io-client';
import {SendMessageForm} from '../Form/FormContainer';
import {MessageField} from '../Form/MessageField';

interface IProps {
    roomName: string;
}

interface ISocketParameters {
    room: string, payload: string, type: string
}

export class ChatRoomComponent extends React.Component<IProps, any> {
    private socket: any;

    constructor(props: IProps) {
        super(props);
        this.socket = io();
        this.socket.emit('room', props.roomName);

        this.socket.on('message', (data) => {
            console.log('Incoming message:', data);
        });

        this.sendMessage = this.sendMessage.bind(this);

    }

    private sendMessage(wrappedMessage: Map<string, string>) {
        const message = wrappedMessage.get('message');

        const SocketParameters: ISocketParameters = {
            payload: message, room: this.props.roomName, type: 'message'
        };

        this.socket.emit('message', SocketParameters);

    }

    public render() {
        return (
            <div>
                <SendMessageForm SubmitForm={  this.sendMessage  }>
                    <MessageField/>
                </SendMessageForm>
            </div>
        );
    }
}

