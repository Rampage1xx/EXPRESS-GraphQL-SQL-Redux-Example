import * as React from 'react';
import {CardSubtitle, CardText, CardTitle} from 'reactstrap';

export const CardBodyText = (props) => {
    const {title, description} = props;
    return (
        <div>
            <CardTitle>{ title }</CardTitle>
            <CardText>{ description }</CardText>
        </div>

    );
};