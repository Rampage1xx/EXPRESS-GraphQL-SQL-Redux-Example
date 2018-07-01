import * as React from 'react';
import Masonry from 'react-masonry-component';
import {FullCard} from '../Card/FullCard';

interface IProps extends IFindUser {
    pins: TSingleImage[]
}

export class Row extends React.PureComponent<IProps, any> {
    private items: any [] = [];

    constructor(props: IProps) {
        super(props);
        this.generateCards(this.props);

    }

    public  componentWillReceiveProps(nextProps: IProps) {
        this.generateCards(nextProps);

    }

    private generateCards(props: IProps) {
        // generating the cards from the props(array) received
        const {pins, id, findUser} = props;
        let loop = 0;
        this.items = [];
        if (pins) {
            while (loop < pins.length) {
                this.items.push(<FullCard key={ pins[loop].id } LoggedInUserID={ id } singleImage={ pins[loop] }
                                          findUser={ findUser }/>);
                loop = loop + 1;
            }
        }
    }

    public  render() {

            return (
                <Masonry
                    elementType={ 'ul' }
                    disableImagesLoaded={ false }
                    updateOnEachImageLoad={ false }
                >
                    { this.items }
                </Masonry>);

    }
}
