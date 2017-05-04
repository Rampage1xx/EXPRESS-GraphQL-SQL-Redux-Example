export const fetchPinsQueryOptions = {
    name : 'pins',
    options : (props) => {
        return {
            variables : {
                indexOffset : props.indexOffset
            }

        };
    },
    props : (props : { ownProps : { currentUser : { loggedUserImagesGraphQL } }, pins }) => {

        if ( props.pins.imagesListGraphQL ) {
            // getting the images list that came back from the GraphQL query
            const imagesList : any[] = props.pins.imagesListGraphQL;

            const loggedInUser : { id : string, images : any[], likes : any[] } = props.ownProps.currentUser.loggedUserImagesGraphQL;
            let arrayRebuilding = [];
            if ( loggedInUser && loggedInUser.id !== 'Guest' ) {
                // filtering which image user has liked
                // some problems in here:
                // data from apollo is passed as props. From react v14 and onwards props are frozen and
                // so they are immutable. We need to reconstruct the whole array passed from the server
                // with the object inside. It can't be simply copied with an equal statement otherwise
                // the returned object is also frozen. We need to use assign to copy the object
                //  change it and then push the changed value. To do so we use the every operator,
                // the loop continues till the result is returned true.
                imagesList.forEach((imageObject) => {
                    const result = loggedInUser.likes.every((imageLiked) => {
                        if ( Object.values(imageObject).indexOf(imageLiked.image_id) !== -1 ) {
                            const change = Object.assign({}, imageObject);
                            change.like = true;
                            console.log(imageLiked.id,'image liked')
                            change.like_id  = imageLiked.id
                            Object.freeze(change);
                            arrayRebuilding.push(change);
                            return false;
                        } else {
                            return true;
                        }
                    });
                    result === true ? arrayRebuilding.push(imageObject) : undefined;
                });
            } else {
                arrayRebuilding = imagesList;
            }
            //   sliced array creation
            // we split the single array that
            // came back from the query in 4 smaller array that will be passed to the multiple rows component
            const finalArrayWithSplittedRows = [];
            // each smaller array will contain six items, so with the modulus we will
            //  calculate the cells that wouldn't end up being inserted in the loop
            const arrayModulus = (arrayRebuilding.length % 6 );
            //  finding the remaining cell location (if the modulus is not zero)
            const remainingCells = arrayModulus !== 0 ? ( arrayRebuilding.length - arrayModulus ) : false;
            // proceeding with the extraction
            for ( let i = 6; i <= (Math.floor(arrayRebuilding.length / 6) * 6); i = i + 6 ) {
                finalArrayWithSplittedRows.push(arrayRebuilding.slice((i - 6), i));
            }
            // assigning the remaining cells if present to the temporary array
            const assigningRemainingCells = remainingCells ?
                finalArrayWithSplittedRows.push(arrayRebuilding.slice((remainingCells), (remainingCells + arrayModulus))) :
                undefined;

            // we assign the sliced values to the component props and return it
            props.pins.imagesListGraphQL = finalArrayWithSplittedRows;
            return ({ pins : props.pins });
        } else {
            // we do nothing
            return ({ pins : props.pins });
        }
    }
};