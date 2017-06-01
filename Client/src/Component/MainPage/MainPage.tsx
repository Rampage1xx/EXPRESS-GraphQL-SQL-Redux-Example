import * as React from 'react';
import {Row} from '../Row/Row';

interface IProps extends IPins, IFindUser {}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve,ms))

export class MainPage extends React.Component<IProps, any> {
       private loading : boolean = false;
    constructor(props: IProps) {
        super(props);
        this.fetchMore = this.fetchMore.bind(this);

    };

    private fetchMore() {
        // avoiding multiple same fetches
        if (!this.loading) {
            this.loading = true;
            this.props.pins.loadMoreEntries();
            sleep(1500).then(r => this.loading = false)
        }
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
