import * as React from 'react';

declare type TProps = {
    avatar: string, userName: string, findUserHandler(): void,
    like: boolean, likeHandler(): void, totalLikes: number
}
export const CardBottom = (props: TProps) => {
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
                <div role='button' className={ `${likeCSS}` } onClick={ likeHandler }/>
                <p className='totalLikes__card__p'> { totalLikes }</p>
            </div>
        </div>

    );

};