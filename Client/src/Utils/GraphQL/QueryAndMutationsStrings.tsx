import {gql} from 'react-apollo';

// QUERIES AND MUTATIONS
export const removeImageMutation = gql`
mutation removeImage($id:String!) {
  removeImageMutation(id:$id) {
    id,
    title,
    totalLikes,
    url,
    userName,
    avatar
  }

}
`;

export const addImageMutation = gql`
mutation addImage ($url: String!, $title:String!, $description: String!) {
  postImageMutation(url:$url,title:$title,description:$description) {
    id,
    title,
    description,

  }

}`;

export const addLikeMutation = gql`
mutation addLike($image_id: String!){
  addLikeMutation(image_id:$image_id) {
  id,
    user_id,
    image_id
  }
}`;

export const removeLikeMutation = gql`
mutation RemoveLike ($identifier: String!){
  removeLikeMutation(identifier: $identifier) {
    id,
    user_id,
    image_id
  }
}
`;

export const findUserImagesQuery = gql`
query findChosenUserImages ($id: String!){
  findUserImagesGraphQL(id:$id){
    id,
    images{
      url,
      title,
      totalLikes,
      avatar,
      user_id,
      description,
      id
    }
  }
}
`;

export const loggedInUserQuery = gql`
{
  loggedUserImagesGraphQL {
    id,
    images{
      id,
      title,
      totalLikes,
      description,
      avatar,
      userName,
      user_id,
      url
    }
    likes{
      id,
      image_id,
      user_id
    }
  }
}

`;
export const fetchPins = gql`
query imageList ($indexOffset: String!){
  imagesListGraphQL(indexOffset: $indexOffset){
    id,
    title,
    url,
    description,
    userName,
    user_id,
    totalLikes,
    avatar,
    created_at
  }
}
`;

export const createUser = gql`
mutation createUser($email:String!, $userName: String!, $password:String!) {
  addUserMutation(email: $email, userName:$userName, password:$password){
    userName,
    id,
    email
  }
}

`;

export const userNameFieldFormValidation: AsyncQueryParameters = ({field, value}) => gql`
{
  ${field}FieldFormValidation(userName: "${value}") {
    id
  }
}

`;