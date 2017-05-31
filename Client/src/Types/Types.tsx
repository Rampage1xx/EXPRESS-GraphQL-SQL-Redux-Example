// a single image object structure
declare type TSingleImage = {
    avatar: string,
    description: string,
    id: string,
    like_id: number,
    title: string,
    like?: boolean,
    totalLikes: number,
    url: string,
    userName: string,
    user_id: string,
};

// the likes array
declare type TLikes = {
    id: string,
    image_id: string,
    user_id: string
}

// the logged in user data, it has two arrays: one being the IPins array and the other being TLikes
// they get filtered to form the personal user array
declare type TLoggedInUser = {
    likes: TLikes[],
    id: string,
    images: TSingleImage[],
    __typename: string
}

declare type TCurrentUser = {
    loggedUserImagesGraphQL: TLoggedInUser,
    refetch(): void,
    // images containing the likes
    images: TSingleImage[],
    fetchMore(): void,
    subscribeToMore(): void,
    startPolling(): void,
    stopPolling(): void,

}

// this is used by apollo internally during the GraphQL fetch to the server.
interface IOwnProps {
    ownProps: {
        currentUser: TCurrentUser
    }
}

// used to fetch images for the guests users,
// later on if the guests log in matches the
// personal Likes array to obtain the customized
// user images
interface IPins {
    pins: {
        imagesListGraphQL: TSingleImage[],
        fetchMore: any,
        feed: any
        loadMoreEntries?(): void,
        refetch?(): void,
    },
}
interface IFindUser {
    id: string,
    findUser(id: string): void
}

interface IFetchPinsProps extends IOwnProps, IPins {
}

declare type AsyncValidationParameters = { userName: string, email: string }

declare type AsyncQueryParameters = (parameter: {field: string, value: string}) => any
