import * as React from 'react';
import {
    Button, Card, CardBlock, CardColumns, CardDeck, CardImg, CardLink, CardSubtitle, CardText, CardTitle, Col, Row
} from 'reactstrap';
import {History} from '../../store/Store';
import {addLikeHandler, removeImageHandler, removeLikeHandler} from '../../Utils/GraphQL/Mutations';
import {CardBodyText} from './CardBodyText';
import {CardBottom} from './CardBottom';
import {CardDelete} from './CardDelete';

interface IProps {
    singleImage: TSingleImage,
    LoggedInUserID: string,
    findUser?(user_id: string): void,
    deletePin?: boolean,
    deleteCard?(index: number): void,
    cell?: any
}
interface IState {
    like: boolean
}
export class FullCard extends React.Component<IProps, IState> {
    private totalLikes: number;
    private likeIdentifier: string;
    private imageId: string;
    private findUser: any;

    constructor(props: IProps) {
        super(props);
        // assigning the like props to the card state
        this.state = {
            like: this.props.singleImage.like
        };
        const {singleImage, LoggedInUserID} = this.props;
        const {totalLikes, id} = singleImage;

        this.totalLikes = totalLikes;
        this.likeIdentifier = LoggedInUserID.concat(id);
        this.imageId = id;
        // checking if the logged in user is the one who posted the image
        //  two outcomes:
        // a) he isn't the one who posted it, if it clicks the image it gets
        // redirected to the profile of the user who has posted it
        // b) he is the one, so if he clicks it he goes to the myImages page
        this.findUser = LoggedInUserID !== singleImage.user_id;

        this.likeHandler = this.likeHandler.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
        this.findUserHandler = this.findUserHandler.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
    }

    public componentWillReceiveProps(nextProps: IProps) {
        // if the like status props changes proceeds to update the state
        const {like, totalLikes} = nextProps.singleImage;

        if (like !== this.state.like) {
            this.setState({like: nextProps.singleImage.like});
        }
        //
        if (totalLikes !== this.totalLikes) {
            this.totalLikes = nextProps.singleImage.totalLikes;
        }

    }

    public componentWillUpdate(nextProps: IProps, nextState: IState) {
        const {LoggedInUserID, singleImage} = nextProps;
        const {id} = singleImage;
        this.likeIdentifier = LoggedInUserID.concat(id);
    }

    private likeHandler() {
        const {LoggedInUserID} = this.props;
        // removing or adding one like from the element
        if (LoggedInUserID !== 'Guest' && !this.state.like) {

            this.totalLikes = this.totalLikes + 1;
            addLikeHandler(this.imageId);
            this.setState({like: true});

        } else if (LoggedInUserID !== 'Guest' && this.state.like) {

            this.totalLikes = this.totalLikes - 1;
            removeLikeHandler(this.likeIdentifier);
            this.setState({like: false});

        }
    };

    private findUserHandler() {
        const {singleImage, findUser} = this.props;
        this.findUser ? findUser(singleImage.user_id)
            :
            History.push('/myImages');
    }

    private deleteImage() {
        const {singleImage, cell, deleteCard} = this.props;
        const {id} = singleImage;
        removeImageHandler(id);
        deleteCard(cell);
    }

    public render() {
        const {singleImage, deletePin} = this.props;
        const {url, title, description, avatar, userName} = singleImage;

        return (
            <Card>
                <CardDelete deletePin={ deletePin } deleteImage={ this.deleteImage }/>
                <CardImg top width='100%' src={ `${url}` }
                         alt='Card image cap'/>
                <CardBlock>
                    <CardBodyText
                        title={ title } description={ description }
                    />
                    <CardBottom
                        totalLikes={ this.totalLikes } findUserHandler={ this.findUserHandler }
                        likeHandler={ this.likeHandler } avatar={ avatar } userName={ userName }
                        like={ this.state.like }
                    />

                </CardBlock>
            </Card>
        );
    }

}
