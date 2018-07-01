/*            <Card>
 <CardDelete deletePin = { deletePin } deleteImage = { this.deleteImage }/>
 <CardImg top width = '100%' src = { `${url}` }
 alt = 'Card image cap' />
 <CardBlock>
 <CardTitle>{ title }</CardTitle>
 <CardSubtitle> { this.likeCSS } </CardSubtitle>
 <CardText>{ description }</CardText>
 <div className = 'bottomCard__Container'>
 <div>
 <img className = 'avatarSize' src = { avatar } alt = 'PinImage' onClick={ this.findUserHandler } />
 <div> { userName } </div>
 </div>
 <div className = 'bottomCard__center'>
 <div className = { `${this.likeCSS}` } onClick = { this.likeHandler } />
 <p className = 'totalLikes__card__p'> { this.totalLikes }</p>
 </div>

 </div>
 </CardBlock>
 </Card>*/