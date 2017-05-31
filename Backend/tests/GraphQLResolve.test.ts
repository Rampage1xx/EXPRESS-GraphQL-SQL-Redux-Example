import * as assert from 'assert';
import {GraphQLString} from 'graphql';
import {LikesSequelize} from '../database/Sequelize/Tables/LikesSequelize';
import {ImageType} from '../GraphQL/ImageQuery';
import './database.test';
import {
    addLikeMutation, agent1, createImageMutation, createUserMutation, imageFind, removeLikeMutation, userFind
} from './variables';

const GraphQLQuery = () => agent1.post('/graphql');

describe('testing graphql fields', () => {
    it('should get a field and test its type', () => {
        assert.deepEqual(ImageType.getFields().id.type, GraphQLString);
        assert.ok(ImageType.getFields().id);
    });
});

describe('testing GRAPHQL validation', () => {

    it('should return invalid', async () => {
        const query = await  GraphQLQuery().send({
            query: createUserMutation,
            variables: {email: 11, userName: 11, password: 11}
        })
            .then(r => r);

    });

});

describe('testing graphql resolve functions', () => {
    const userName = 'hello12345';
    const password = 'ciao123456';
    const email = 'hello@hello.com';
    it('should resolve create user', async () => {

        const query = await GraphQLQuery().send({
            query: createUserMutation,
            variables: {email, userName, password}
        })
            .then((res) => res.body.data.addUserMutation.userName);

        assert.deepEqual(query, userName);
    });

    it('should log in', async () => {
        const status = await agent1.post('/login')
            .send({username: userName, password: password})
            .then((res) => res.body.login);

        assert.deepEqual(status, true, 'there should be a boolean true indicating successful login');
    });

    it('should create an image', async () => {
        const query = await GraphQLQuery()
            .send({
                query: createImageMutation,
                variables: {url: 'http://heythere', title: 'test1', description: 'a good test'}
            })
            .then(res => res.body.data.postImageMutation.title);
        assert.deepEqual(query, 'test1', 'there should be the title of the image');
    });

    it('should create a like entry', async () => {

        const image: any = await imageFind('test1');

        const like = await GraphQLQuery()
            .send({
                query: addLikeMutation,
                variables: {image_id: image.id}
            })
            .then(res => res.body.data.addLikeMutation);

        const imageAfter: any = await imageFind('test1');

        assert.deepEqual(like.image_id, image.id, 'there should be the ID of the image that has been liked');
        assert.deepEqual(imageAfter.totalLikes, 1, 'there should be a like');
    });

    it('should remove a like', async () => {
        const image: any = await imageFind('test1');
        const user: any = await userFind(userName);
        const deletedLikeID = await GraphQLQuery()
            .send({
                query: removeLikeMutation,
                variables: {identifier: user.id.concat(image.id)}
            })
            .then(res => res.body.data.removeLikeMutation.id);
        const imageAfter: any = await imageFind('test1');
        const findDeletedLike = await LikesSequelize.findById(deletedLikeID);

        assert.deepEqual(imageAfter.totalLikes, 0, 'the total likes should be 0 after the like removal');
        assert.notDeepEqual(deletedLikeID, null, 'there should be the ID of the like removed from the DB');
        assert.deepEqual(findDeletedLike, null, 'the like should not be present into the DB after its removal');
    });
});

