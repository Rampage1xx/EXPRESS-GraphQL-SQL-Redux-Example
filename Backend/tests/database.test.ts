import * as assert from 'assert';
import * as protobuf from 'protobufjs';
import {connection, ImagesSequelize, LikesSequelize, UsersSequelize} from '../database/SequelizeTables';
import {ImagesArrayProtoBuffer, redisClient} from '../database/Redis';

const root = new protobuf.Root();

before('clear databases', async () => {
    this.timeout = 5000;
    console.log('*********CLEARING DATABASES**************');
    redisClient.flushdbAsync()
        .then(r => console.log('redis flushed'));

    await connection.sync({force: true})
        .then(r => console.log('postgres cleared'))
        .catch(e => e);

});

const payload = [
    {
        dataValues: {
            'id': '42a34308-5f08-4235-8660-f51097d6070f',
            'title': 'add2',
            'url': 'https://pics.onsizzle.com/its-a-meme-you-dip-rng-lip-com-2588563.png',
            'description': 'add2', 'totalLikes': 0,
            'userName': 'Roseline Buffo',
            'avatar': 'http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png',
            'user_id': '00b4c79e-795f-49e1-9f4d-9a5e42dc96b8'

        }
    },
    {
        dataValues: {

            'id': 'casa',
            'title': 'add3',
            'url': 'https://pics.onsizzle.com/its-a-meme-you-dip-rng-lip-com-2588563.png',
            'description': 'add2', 'totalLikes': 0,
            'userName': 'Roseline Buffo',
            'avatar': 'http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png',
            'user_id': '00b4c79e-795f-49e1-9f4d-9a5e42dc96b8'

        }
    }];

const findUser = () => UsersSequelize.findOne({
    where: {
        email: 'donald@duck.com'
    }
});

const findImage = () => ImagesSequelize.findOne({
    where: {
        title: `title of image`
    }
});

describe('CRUD', () => {

    it('should create an user', async () => {
        const createUser = await UsersSequelize.create({
            email: 'donald@duck.com',
            username: 'donald'
        });
        assert.deepEqual(createUser.email, 'donald@duck.com');

    });

    it('should create an image', async () => {
        const createImage: any = await findUser()
            .then(user =>
                ImagesSequelize.create({
                    url: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=256%C3%97180&w=256&h=180',
                    description: `this is image `,
                    title: `title of image`,
                    userName: user.twitterUsername,
                    avatar: 'http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png',
                    user_id: user.id
                })
            );
        assert.deepEqual(createImage.title, `title of image`);
    });

    it('it should create a like', async () => {
        const user = await findUser();

        const image: any = await findImage();

        const like: any = await LikesSequelize.create({
            user_id: user.id,
            image_id: image.id,
            identifier: user.id.concat(image.id)
        });

        assert.deepEqual(like.identifier, user.id.concat(image.id));

    });

    it('should add +1 to  image totalLikes', async () => {
        const image: any = await findImage();

        const updateImage = await image.increment('totalLikes');

        assert.deepEqual(updateImage.totalLikes, 1);
    });

    it('should delete a user', async () => {

        await  findUser().then(user => user.destroy());

        const checkIfDeleted = await findUser();
        assert.deepEqual(checkIfDeleted, null);
    });

});

describe(' protocol buffer tests', () => {

    it('should convert an array to protobuff and get it back', () => {

            return root.load('./database/Images.proto', {keepCase: true})
                .then(r => {
                    const argument = {images: payload};
                    const ImageArray = r.lookupType('ImageDefinition.ImageList');

                    const errMsg = ImageArray.verify(argument);
                    if (errMsg) {
                        throw errMsg;
                    }
                    const message = ImageArray.create(argument);
                    const buffer = ImageArray.encode(message).finish();
                    const decrypt = ImageArray.decode(buffer);
                    const transformBackToArray = decrypt.toObject({arrays: true});
                    return assert.deepEqual(payload, transformBackToArray.images);
                });
        }
    );

    it('should save a buffer into redis and get it back', async () => {
        const argument = {images: payload};
        const encoded = await ImagesArrayProtoBuffer({argument, encode: true});
        await redisClient.setexAsync('B', 60, encoded);
        const data = await redisClient.getAsync('B');
        const decoded = await ImagesArrayProtoBuffer({argument: data, decode: true});
        assert.deepEqual(decoded.images, payload);
    });
});
