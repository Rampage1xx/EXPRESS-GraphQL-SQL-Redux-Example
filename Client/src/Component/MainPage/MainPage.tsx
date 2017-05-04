import * as React from 'react';
import {Row} from '../Row/Row';

interface IProps extends IPins, IFindUser {}

export class MainPage extends React.Component<IProps, any> {

    constructor(props: IProps) {
        super(props);
        this.fetchMore = this.fetchMore.bind(this);

    };

    private fetchMore() {
        this.props.pins.loadMoreEntries();
    }

    public render() {
        const {id, pins, findUser} = this.props;
        const {imagesListGraphQL} = pins;

        return (
            <div>
                <Row id={ id } pins={ imagesListGraphQL } findUser={ findUser }/>

                <div className='LoadMore' onMouseEnter={ this.fetchMore }>
                    <h2> Hover me to load more!</h2>
                </div>

            </div>
        );
    }
}
