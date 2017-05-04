declare type TProps =  {
    ownProps: {
        currentUser: {
            loggedUserImagesGraphQL: any[]
        }
    },
    pins2: {
        imagesListGraphQL: any[],
        fetchMore: any,
        feed: any
    }
}

declare type TLoggedInUser =  { id : string, images : any[], likes : any[] }

declare type TPins = [TSingleImage]

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

declare type TDeleteCard =  (index) => null;

interface MethodsDelete {
    deleteCard(index):  null
}