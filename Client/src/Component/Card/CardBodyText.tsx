import * as React from 'react';
import {CardSubtitle, CardText, CardTitle} from 'reactstrap';

declare type TProps = {title: string, description: string};

export const CardBodyText = (props: TProps): JSX.Element => {
    const {title, description} = props;
    return (
        <div>
            <CardTitle>{ title }</CardTitle>
            <CardText>{ description }</CardText>
        </div>

    );
};
