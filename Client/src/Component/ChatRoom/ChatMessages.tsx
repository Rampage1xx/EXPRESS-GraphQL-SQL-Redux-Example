import * as React from 'react';

interface IProps {
chatMessages: string[];
}

export const ChatMessages = (props: IProps) => {


    return (
        <div>
            {props.chatMessages}

        </div>
    )
}
