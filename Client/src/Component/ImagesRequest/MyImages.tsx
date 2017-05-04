import * as React from 'react';
import Masonry from 'react-masonry-component';
import { GenerateMasonry } from './GenerateMasonry';
export class MyImages extends React.PureComponent<any, any> {
    private myItems : any [] = [];

    constructor(props) {
        super(props);
        this.deleteCard = this.deleteCard.bind(this);
        this.state = {
            deletedItems : 0
        };
        this.generateMasonryCards(this.props);
    }

    private deleteCard(index) {
        delete this.myItems[index];
        this.setState({
            deletedItems : this.state.deletedItems + 1
        });
    }

    private generateMasonryCards(propsLocation) {
        // we generate the user masonry
        const { userImages } = propsLocation;
        this.myItems = [];
        if ( userImages ) {
            const { images } = userImages;

            this.myItems = GenerateMasonry({
                images,
                deletePin : true,
                deleteCardFunction : this.deleteCard
            });

        }
    }

    private componentWillReceiveProps(nextProps) {
        // console.log('props del my images', nextProps)
        this.generateMasonryCards(nextProps);

    }

    public  render() {
        return (
            <Masonry
                elementType = { 'div' }
                disableImagesLoaded = { false }
                updateOnEachImageLoad = { false }
            >
                { this.myItems }
            </Masonry>

        );
    }
}

/*            /*let loop = 0;
 if ( images && images.length >= 1 ) {
 while ( loop < images.length ) {
 this.myItems.push(
 <FullCard key = { images[loop].id } user_id = { images[loop].user_id}
 deletePin = {true} deleteCard = { this.deleteCard } cell = {loop}
 singleImage = {images[loop]}
 />
 );

 loop = loop + 1;
 }*/