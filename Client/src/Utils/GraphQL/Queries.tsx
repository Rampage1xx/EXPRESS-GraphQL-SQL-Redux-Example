// image is the GRAPHQL variable  and prop.images comes from the reducer
import { client } from '../../store/Store';
import { findUserImagesQuery } from './QueryAndMutationsStrings';

export const addLikeStatusToArray = (imagesList : any[], likes : any[]) => {
    // filtering which image user has liked
    // some problems in here:
    // data from apollo is passed as props. From react v14 and onwards props are frozen and
    // so they are immutable. We need to reconstruct the whole array passed from the server
    // with the object inside. It can't be simply copied with an equal statement otherwise
    // the returned object is also frozen. We need to use assign to copy the object
    //  change it and then push the changed value; to do so we use the every operator,
    // the loop continues till the result is returned true.
    const arrayRebuilding = [];
    imagesList.forEach((imageObject) => {
        const result = likes.every((imageLiked) => {
            if ( Object.values(imageObject).indexOf(imageLiked.image_id) !== -1 ) {
                const newArrayCellWithLike = Object.assign({}, imageObject);
                newArrayCellWithLike.like = true;
                newArrayCellWithLike.like_id = imageLiked.id;
                Object.freeze(newArrayCellWithLike);
                arrayRebuilding.push(newArrayCellWithLike);
                return false;
            } else {
                return true;
            }
        });
        if ( result === true ) {
            arrayRebuilding.push(imageObject);
        }
    });
    return arrayRebuilding;
};


export const currentUserQueryOptions = {
    name : 'currentUser',
    options : (props) => (
        { variables : { image : props.images } }),
    props : (props) => {
        try {
            const { loggedUserImagesGraphQL } = props.currentUser;
            let arrayRebuilding : any[] = [];
            if ( loggedUserImagesGraphQL && loggedUserImagesGraphQL.id !== 'Guest' ) {
                const { images, likes } = loggedUserImagesGraphQL;
                arrayRebuilding = addLikeStatusToArray(images, likes);
                props.currentUser.images = arrayRebuilding;
            }
            return { currentUser : props.currentUser };
        } catch ( err ) {
            throw err;
        }

    }
};

export const findUserImagesQueryHandler = (id) => {
    return client.query({ query : findUserImagesQuery, variables : { id } })
        .then(res => res)
        .catch(e => e);
};

export const fetchPinsQueryOptions2 = {
    name : 'pins2',
    options : (props) => {
        return {
            variables : {
                indexOffset : props.indexOffset
            },
            fetchPolicy : 'network-only'

        };
    },
    props : (props : { ownProps : { currentUser : { loggedUserImagesGraphQL } }, pins2 : { imagesListGraphQL, fetchMore, feed } }) => {
        const loadMoreEntries = () => {
            const {imagesListGraphQL} = props.pins2;
            return props.pins2.fetchMore({
                variables : {
                    indexOffset :  imagesListGraphQL.length

                },
                updateQuery : (previousResult, next) => {

                    if ( !next.fetchMoreResult ) {
                        return previousResult;
                    }

                    return Object.assign({}, previousResult, {
                        imagesListGraphQL : [...previousResult.imagesListGraphQL, ...next.fetchMoreResult.imagesListGraphQL]
                    });
                }
            });
        };

        const imagesList : any[] = props.pins2.imagesListGraphQL;
        const loggedInUser : { id : string, images : any[], likes : any[] } = props.ownProps.currentUser.loggedUserImagesGraphQL;

        let arrayRebuilding = [];
        if ( loggedInUser && loggedInUser.id !== 'Guest' ) {
            // getting the images list that came back from the GraphQL query

            const { likes } = loggedInUser;

            arrayRebuilding = addLikeStatusToArray(imagesList, likes);
        } else {
            arrayRebuilding = imagesList;
        }

        props.pins2.imagesListGraphQL = arrayRebuilding;
        return {
            pins2 : {
                ...props.pins2,
                loadMoreEntries
            }
        };
    }

};


/*                    const result = likes.every((imageLiked) => {
 if ( Object.values(imageObject).indexOf(imageLiked.image_id) !== -1 ) {
 const rebuildObjectWithLike = Object.assign({}, imageObject);
 rebuildObjectWithLike.like = true;
 rebuildObjectWithLike.like_id = imageLiked.id;
 Object.freeze(rebuildObjectWithLike);
 arrayRebuilding.push(rebuildObjectWithLike);
 return false;
 } else {
 return true;
 }
 });
 result === true ? arrayRebuilding.push(imageObject) : undefined;
 }); */






/*             imagesList.forEach((imageObject) => {
 const result = likes.every((imageLiked) => {
 if ( Object.values(imageObject).indexOf(imageLiked.image_id) !== -1 ) {
 const newArrayCellWithLike = Object.assign({}, imageObject);
 newArrayCellWithLike.like = true;
 newArrayCellWithLike.like_id = imageLiked.id;
 Object.freeze(newArrayCellWithLike);
 arrayRebuilding.push(newArrayCellWithLike);
 return false;
 } else {
 return true;
 }
 });
 result === true ? arrayRebuilding.push(imageObject) : undefined;
 }); */