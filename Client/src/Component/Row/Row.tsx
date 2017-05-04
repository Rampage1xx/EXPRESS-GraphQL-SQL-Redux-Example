import * as React from 'react';
import Masonry from 'react-masonry-component';
import {FullCard} from '../Card/FullCard';

interface IProps {
    pins: TPins,
    id,
    end,
    start,
    findUser,
    
}

export class Row extends React.PureComponent<IProps, any> {
    private items : any [] = [];
    constructor(props) {
        super(props);
        this.generateCards(this.props);
/*
        this.findUserHandler = this.findUserHandler.bind(this)
*/
    }

    private  componentWillReceiveProps(nextProps) {
        this.generateCards(nextProps);

    }

/*    private findUserHandler ( user_id ) {
        const { likes } = this.props;
       History.push('/userImages', {id: user_id, likes})

    }*/

    private generateCards(props) {
        // generating the cards from the props(array) received
        const { pins, start, id, findUser } = props;
        let loop = start;
        this.items = [];
        if ( pins ) {
            while ( loop < pins.length ) {
                this.items.push(<FullCard key = { pins[loop].id } LoggedInUserID = { id } singleImage = { pins[loop] }
                                           findUser= { findUser }   />);
                loop = loop + 1;
            }
        }
    }

    public  render() {
        return (
            <Masonry
                elementType = { 'ul' }
                disableImagesLoaded = { false }
                updateOnEachImageLoad = { false }
            >
                { this.items }
            </Masonry>);
    }
}
