import {client} from '../../store/Store';
import {findUserImagesQuery} from './QueryAndMutationsStrings';
import {get} from 'lodash';

export const formAsyncValidationQuery = (query) => {
    return client.query({query}).then((res: any) => {
        if (res.userName && res.userName !== 'available') {
            throw {username: 'Already Taken'};
        } else if (res.email && res.email !== 'available') {
            throw {email: 'Already Taken'};
        }
    })
};

export const addLikeStatusToArray = (imagesList: any[], likes: any[]) => {
    // adding the like status to the images that the user has liked
    const arrayRebuilding = [];
    // safety check
    if (!imagesList) {
        return [];
    } else if (!likes) {
        return imagesList;
    }
    // for each image of the array
    try {
        imagesList.forEach((imageObject) => {
            const noLikeForTheImage = likes.every((imageLiked) => {
                // we search the like array for a corresponding match
                if (Object.values(imageObject).indexOf(imageLiked.image_id) !== -1) {
                    // if we find it we stop the loop
                    const newArrayCellWithLike = Object.assign({}, imageObject);
                    newArrayCellWithLike.like = true;
                    newArrayCellWithLike.like_id = imageLiked.id;
                    Object.freeze(newArrayCellWithLike);
                    arrayRebuilding.push(newArrayCellWithLike);
                    return false;
                } else {
                    // otherwise we keep searching
                    return true;
                }
            });
            if (noLikeForTheImage === true) {
                //if the image had no corresponding result we push the un-liked image in the array
                arrayRebuilding.push(imageObject);
            }
        });
    } catch (err) {
        throw err;
    }
    return arrayRebuilding;
};

export const currentUserQueryOptions = {
    name: 'currentUser',
    options: (props) => (
        {variables: {image: props.images}}),
    props: (props) => {
        try {
            const {loggedUserImagesGraphQL} = props.currentUser;
            let arrayRebuilding: any[] = [];
            if (loggedUserImagesGraphQL && loggedUserImagesGraphQL.id !== 'Guest') {
                const {images, likes} = loggedUserImagesGraphQL;
                arrayRebuilding = addLikeStatusToArray(images, likes);
                props.currentUser.images = arrayRebuilding;
            }
            return {currentUser: props.currentUser};
        } catch (err) {
            throw err;
        }

    }
};

export const findUserImagesQueryHandler = (id) => {
    return client.query({query: findUserImagesQuery, variables: {id}})
        .then(res => res)
        .catch(e => e);
};

export const fetchPinsQueryOptions2 = {
    name: 'pins',
    options: (props) => {
        return {
            variables: {
                indexOffset: props.indexOffset
            },
            fetchPolicy: 'network-only'

        };
    },
    props: (props: IFetchPinsProps) => {

        // defining a method to load more entries
        const loadMoreEntries = () => {
            const {imagesListGraphQL} = props.pins;
            const fetchLastCreatedAt = (get(imagesListGraphQL, 'length') as number) - 1;
            return props.pins.fetchMore({
                variables: {
                    indexOffset: get(imagesListGraphQL, [fetchLastCreatedAt, 'created_at'], new Date())
                },
                updateQuery: (previousResult, next) => {

                    if (!next.fetchMoreResult) {
                        return previousResult;
                    }
                    // assigning the new values to the precedent fetch
                    return Object.assign({}, previousResult, {
                        imagesListGraphQL: [...previousResult.imagesListGraphQL, ...next.fetchMoreResult.imagesListGraphQL]
                    });
                }
            });
        };
        // method over
        // extracting the images list to show to the user
        const imagesList = props.pins.imagesListGraphQL;
        // retrieving the user preferences if he is logged in
        const loggedInUser = props.ownProps.currentUser.loggedUserImagesGraphQL;

        let arrayRebuilding: any[] = [];
        // checks if the user has logged in
        if (loggedInUser && loggedInUser.id !== 'Guest') {
            // if there is a user logged in, we proceed to get the images that he liked from the "likes" array
            const {likes} = loggedInUser;
            // we rebuild the images list with the like attribute
            arrayRebuilding = addLikeStatusToArray(imagesList, likes);
        } else {
            // otherwise we push the image as it is if there is no like present
            arrayRebuilding = imagesList;
        }
        // assigning the rebuild image to a prop value
        props.pins.imagesListGraphQL = arrayRebuilding;
        // returning the prop plus the  load more method
        return {
            pins: {
                ...props.pins,
                loadMoreEntries
            }
        };
    }

};

