import * as React from 'react';
import Masonry from 'react-masonry-component';
import {RouteComponentProps} from 'react-router';
import {GenerateMasonry} from '../../Utils/GenerateMasonry';
import {addLikeStatusToArray, findUserImagesQueryHandler} from '../../Utils/GraphQL/Queries';

export class UserImages extends React.Component<RouteComponentProps<{id: string, likes: any[]}>, any> {
    private userID: string;
    private likes: any[];

    constructor(props: RouteComponentProps<{id: string, likes: any[]}>) {
        super(props);
        this.likes = [];
        const {id, likes} = props.history.location.state;
        this.userID = id;
        this.likes = likes;
        this.state = {processedImages: []};

    }

    public componentDidMount() {
        findUserImagesQueryHandler(this.userID)
            .then((response) => {
                this.generateMasonryCards(response.data);
            })
            .catch(e => e);
    }

    private generateMasonryCards(data: any) {
        // we generate the user masonry
        let result = [];
        const {findUserImagesGraphQL} = data;
        if (findUserImagesGraphQL) {

            const {images} = findUserImagesGraphQL;
            result = addLikeStatusToArray(images, this.likes);
            result = GenerateMasonry({
                images: result,
                deletePin: false,
                deleteCardFunction: false,
                id: this.userID
            });

        } else {
            result.push(<div key={ 1234 }> Error while fetching data...</div>);
        }
        this.setState({
            processedImages: result
        });
    }

    public render() {
        return (
            <Masonry
                elementType={ 'div' }
                disableImagesLoaded={ false }
                updateOnEachImageLoad={ false }
            >
                { this.state.processedImages }
            </Masonry>

        );
    }
}
