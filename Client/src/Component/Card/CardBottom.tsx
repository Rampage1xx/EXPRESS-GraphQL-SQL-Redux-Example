import * as React from 'react';

export const CardBottom = (props) => {
    const {avatar, userName, findUserHandler, like, likeHandler, totalLikes} = props;

    // assigning css depending if a like is present or not
    const likeCSS = like ? 'fa fa-star fa-2x faLightGreen' : 'fa fa-star-o fa-2x';

    return (
        <div className='bottomCard__Container'>
            <div>
                <img className='avatarSize' src={ avatar } alt='PinImage' onClick={ findUserHandler }/>
                <div> { userName } </div>
            </div>
            <div className='bottomCard__center'>
                <div className={ `${likeCSS}` } onClick={ likeHandler }/>
                <p className='totalLikes__card__p'> { totalLikes }</p>
            </div>
        </div>

    );

};