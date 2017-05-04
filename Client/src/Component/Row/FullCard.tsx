import * as React from 'react';
import { Button, Card, CardBlock, CardColumns, CardDeck, CardImg, CardLink, CardSubtitle, CardText, CardTitle, Col, Row } from 'reactstrap';
import { addLikeHandler, removeImageHandler, removeLikeHandler } from '../../Utils/GraphQL/Mutations';
import { History } from '../../store/Store'
export class FullCard extends React.Component<any, any> {
    private totalLikes : number;
    private likeIdentifier : string;
    private imageId : string;
    private like : string;
    private findUser: any;
    constructor(props) {
        super(props);
        this.state = {
            like : this.props.singleImage.like
        };
        const { singleImage, user_id } = this.props;
        const { totalLikes, id } = singleImage;

        this.totalLikes = totalLikes;
        this.likeIdentifier = user_id.concat(id);
        this.imageId = id;
        this.findUser = user_id !== singleImage.user_id;

        this.clickHandler = this.clickHandler.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
        this.findUserHandler = this.findUserHandler.bind(this)
    }

    private componentWillReceiveProps(nextProps) {
        const update = nextProps.singleImage.like !== this.state.like ?
            this.setState({ like : nextProps.singleImage.like }) :
            undefined;
        this.totalLikes = nextProps.singleImage.totalLikes;

    }

    private componentWillUpdate(nextProps, nextState) {
        const { user_id, singleImage } = nextProps;
        const { id } = singleImage;
        this.likeIdentifier = user_id.concat(id);
        // this.imageId = this.props.singleImage.id;
    }

    private clickHandler() {
        const { user_id } = this.props;
        // removing or adding one like from the element
        if ( user_id !== 'Guest' && !this.state.like ) {

            this.totalLikes = this.totalLikes + 1;
            // addLikeHandler(this.props.singleImage.id);
            addLikeHandler(this.imageId);
            this.setState({
                like : true
            });

        } else if ( user_id !== 'Guest' && this.state.like ) {

            this.totalLikes = this.totalLikes - 1;

            removeLikeHandler(this.likeIdentifier);

            this.setState({
                like : false
            });
        }
    };

    private findUserHandler () {
        const { singleImage, user_id, findUser } = this.props;

        this.findUser ? findUser(singleImage.user_id)
            :
        History.push('/myImages')
/*
        this.findUser ? History.push('/userImages', {id: singleImage.user_id})
            :
            History.push('/myImages')
*/

     }

    private deleteImage() {
        const {singleImage, cell} = this.props;
        const { id } = singleImage;
        removeImageHandler(id);
        this.props.deleteCard(cell);
    }

    public render() {
        const { singleImage, deletePin } = this.props;
        const { url, title, description, avatar, userName } = singleImage;
        // like identifier needed for item removal
        // css element for item deletion (cross on the upper side of the card)
        const enableDelete = deletePin ?
            <div className = 'fa fa-times fa-1x faRed' onClick = {this.deleteImage} />
            :
            undefined;
            // assigning css depending if a like is present or not
        this.like = this.state.like ?
            'fa fa-star fa-2x faLightGreen'
            :
            'fa fa-star-o fa-2x';

        return (
            <Card>
                { enableDelete }
                <CardImg top width = '100%' src = { `${url}` }
                         alt = 'Card image cap' />
                <CardBlock>
                    <CardTitle>{ title }</CardTitle>
                    <CardSubtitle> { this.like } </CardSubtitle>
                    <CardText>{ description }</CardText>
                    <div className = 'bottomCard__Container'>
                        <div>
                            <img className = 'avatarSize' src = { avatar } alt = 'PinImage' onClick={this.findUserHandler} />
                            <div> { userName } </div>
                        </div>
                        <div className = 'bottomCard__center'>
                            <div className = { `${this.like}` } onClick = { this.clickHandler } />
                            <p className = 'totalLikes__card__p'> { this.totalLikes }</p>
                        </div>

                    </div>
                </CardBlock>
            </Card>
        );
    }

}
