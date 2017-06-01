import {get} from 'lodash';
import * as React from 'react';
import Masonry from 'react-masonry-component';
import {GenerateMasonry} from '../../Utils/GenerateMasonry';
interface IProps {
    userImages: TCurrentUser
}

export class MyImages extends React.PureComponent<IProps, any> {
    private myItems: any [] = [];

    constructor(props: IProps) {
        super(props);
        this.deleteCard = this.deleteCard.bind(this);
        this.state = {deletedItems: 0};
        this.generateMasonryCards(this.props);
    }

    private deleteCard(index: number) {
        delete this.myItems[index];
        this.setState({deletedItems: this.state.deletedItems + 1});
    }

    private generateMasonryCards(propsPassed: IProps) {
        // we generate the user masonry
        const {userImages} = propsPassed;
        this.myItems = [];
        if (userImages) {
            const {images, loggedUserImagesGraphQL} = userImages;
            // checks if the id is fetched from the server otherwise assigns false
            const id: any = get(loggedUserImagesGraphQL, 'id', false) as string | boolean;
            if (id) {
                this.myItems = GenerateMasonry({
                    images,
                    deletePin: true,
                    deleteCardFunction: this.deleteCard,
                    id
                });
            }

        }
    }

    public componentWillReceiveProps(nextProps: IProps) {
        this.generateMasonryCards(nextProps);

    }

    public  render() {
        return (
            <Masonry
                elementType={ 'div' }
                disableImagesLoaded={ false }
                updateOnEachImageLoad={ false }
            >
                { this.myItems }
            </Masonry>

        );
    }
}

