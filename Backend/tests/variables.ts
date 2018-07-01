import { agent } from 'supertest';
import { ImageSequelize } from '../database/Sequelize/Tables/ImageSequelize';
import { UserSequelize } from '../database/Sequelize/Tables/UserSequelize';
import { app } from '../server';

export const agent1 = agent(app);

export const imageFind = (title) => ImageSequelize.findOne({
    where: {
        title,
    },
});

export const userFind = (userName): any => UserSequelize.findOne({
    where: {
        userName: userName,
    },
});

export const GraphQLQuery = () => agent1.post('/graphql');

export const createUserMutation = `
  mutation createUser($email:String!, $userName: String!, $password:String!) {
  addUserMutation(email: $email, userName:$userName, password:$password){
    userName,
    id,
    email
  }
}`;

export const createImageMutation = `
mutation addImage ($url: String!, $title:String!, $description: String!) {
  postImageMutation(url:$url,title:$title,description:$description) {
    id,
    title,
    description,
  }
}`;

export const addLikeMutation = `
mutation addLike($image_id: String!){
  addLikeMutation(image_id:$image_id) {
  id,
    user_id,
    image_id
  }
}`;
export const removeLikeMutation = `
mutation RemoveLike ($identifier: String!){
  removeLikeMutation(identifier: $identifier) {
    id,
    user_id,
    image_id
  }
}
`;
export const fetchPins = `
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
