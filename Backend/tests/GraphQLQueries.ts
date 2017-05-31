import * as assert from 'assert';
import {ImagesSequelize} from '../database/Sequelize/Tables/ImagesSequelize';
import {closeServer} from '../server';
import './GraphQLResolve.test';
import {fetchPins, GraphQLQuery, userFind} from './variables';

describe(' testing GraphQL queries', () => {
    const userName = 'hello12345';
    let dateToSend;
    before('creating a batch of images to operate with', async () => {
        const createDatabaseEntries = (user) => {
            console.log('making fake images');
            for (let i = 0; i < 100; i++) {
                ImagesSequelize.create({
                    url: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=256%C3%97180&w=256&h=180',
                    description: `this is image ${i}`,
                    title: `title of image ${i}`,
                    userName: 'donny',
                    avatar: 'http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png',
                    user_id: user.id
                })
                    .catch(e => console.log(e));
            }

        };
        const user: any = await userFind(userName);
        createDatabaseEntries(user);
        dateToSend = new Date();

    });

    // defining the function that fetches the images
    const fetchImages = () => GraphQLQuery()
        .send({
            query: fetchPins,
            variables: {indexOffset: dateToSend}
        })
        .then(res => res.body.data.imagesListGraphQL);

    it('should retrieve the images list', async () => {
        const imagesArray = await fetchImages();
        assert.deepEqual(imagesArray.length, 24);
    });

    it('should retrieve the images through redis', async () => {
        const imagesArray = await fetchImages();
        assert.deepEqual(imagesArray.length, 24);

    });
});

closeServer.close();
