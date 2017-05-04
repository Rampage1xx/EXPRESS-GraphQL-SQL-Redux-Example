import * as React from 'react';
import { Row } from '../Row/Row';

export class MainPage extends React.Component<any, any> {

    constructor (props) {
        super(props);
        this.fetchMore = this.fetchMore.bind(this);

    };

    private fetchMore () {
        this.props.pins.loadMoreEntries();
    }

    public render () {
        const {id, start, end, pins, findUser} = this.props;
        const {imagesListGraphQL} = pins;
        return (
            <div>
                    <Row id = { id } end = { end }
                         start = { start }
                         pins = { imagesListGraphQL }  findUser= { findUser }/>

                <div className = 'LoadMore' onMouseEnter = { this.fetchMore }><h2> Hover me to load more!</h2></div>

            </div>
        );
    }
}
