import * as assert from 'assert';
import * as protobuf from 'protobufjs';
import {ImagesArrayProtoBuffer, redisClient} from '../database/Redis';
import {resolvePendingFriendship} from '../database/Sequelize/NativeQueries/FriendRequestsPSQL';
import {getFriends} from '../database/Sequelize/NativeQueries/FriendsPSQL';
import {connection} from '../database/Sequelize/SequelizeConfiguration';
import '../database/Sequelize/SequelizeConnect';
import {FriendRequestSequelize, IFriendRequestInstance} from '../database/Sequelize/Tables/FriendRequestsSequelize';
import {FriendsSequelize} from '../database/Sequelize/Tables/FriendsSequelize';
import {IImageInstance, ImagesSequelize} from '../database/Sequelize/Tables/ImagesSequelize';
import {LikesSequelize} from '../database/Sequelize/Tables/LikesSequelize';
import {UsersSequelize} from '../database/Sequelize/Tables/UsersSequelize';
import {
    IFindFriendsResultsMapped, IFindFriendsResultsPSQL, ILikesInstance, IUserAttributes, IUserInstance
} from '../types/database.types';
import {userFind} from './variables';

const root = new protobuf.Root();

before('clear databases', function (done) {
    this.timeout(1000000);
    console.log('*********CLEARING DATABASES**************');
    redisClient.flushdbAsync()
        .then(r => console.log('redis flushed'));

    connection.sync({force: true})
        .then(r => done())
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

const findUser: () => any = () => UsersSequelize.findOne({
    where: {
        email: 'donald@duck.com'
    }
});

const findImage: () => any = () => ImagesSequelize.findOne({
    where: {
        title: `title of image`
    }
});

describe('CRUD', () => {

    it('should create an user', async () => {
        const createUser = await UsersSequelize.create({
            email: 'donald@duck.com',
            userName: 'donald'
        });

        const createUser2 = await UsersSequelize.create({
            email: 'battle@toads.com',
            userName: 'battletoads'
        });

        const createUser3 = await UsersSequelize.create({
            email: 'conker@live.reloaded',
            userName: 'conker'
        });
        assert.deepEqual(createUser3.email, 'conker@live.reloaded');
        assert.deepEqual(createUser2.email, 'battle@toads.com');
        assert.strictEqual(createUser.email, 'donald@duck.com');

    });

    it('should create an image', async () => {
        const createImage: any = await findUser()
            .then((user: IUserAttributes) =>
                ImagesSequelize.create({
                    url: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=256%C3%97180&w=256&h=180',
                    description: `this is image `,
                    title: `title of image`,
                    userName: user.twitterUsername,
                    avatar: 'http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png',
                    user_id: user.id
                })
            );
        assert.strictEqual(createImage.title, `title of image`);
    });

    it('it should create a like', async () => {
        const user: IUserInstance = await findUser();

        const image: IImageInstance = await findImage();

        const like: ILikesInstance = await LikesSequelize.create({
            user_id: user.id,
            image_id: image.id,
            identifier: user.id.concat(image.id)
        });

        assert.deepEqual(like.identifier, user.id.concat(image.id));

    });

    it('should add +1 to  image totalLikes', async () => {
        const image: IImageInstance = await findImage();

        const updateImage: IImageInstance = await image.increment('totalLikes');

        assert.deepEqual(updateImage.totalLikes, 1);
    });

    it('should create a friend request', async () => {
        const user1 = await userFind('donald');
        const user2 = await userFind('battletoads');
        const user3 = await userFind('conker');
        const request: IFriendRequestInstance = await FriendRequestSequelize.create({
            user_one: user1.id,
            user_two: user2.id
        });
        const request2 = await FriendRequestSequelize.create({
            user_one: user1.id,
            user_two: user3.id
        });
        assert.deepEqual(request.user_one, user1.id);
        assert.deepEqual(request.user_two, user2.id);
        assert.deepEqual(request2.user_two, user3.id);

    });

    it('should accept a friend request', async () => {

        // needs to be refactored too much repetition
        const user1 = await userFind('donald');
        const user2 = await userFind('battletoads');
        const user3 = await userFind('conker');
        const accept = await connection.query(
            resolvePendingFriendship({
                status: 'ACCEPTED',
                user_two: user2.id,
                user_one: user1.id
            }),
            {plain: true}
        );

        const accept2 = await connection.query(
            resolvePendingFriendship({
                status: 'ACCEPTED',
                user_two: user3.id,
                user_one: user1.id
            })
        );

        const friendRequest = await FriendRequestSequelize.findOne();
        const friendStatus = await FriendsSequelize.findOne();
        const findFriends = await UsersSequelize.find({
            where: {userName: 'donald'}, include: [FriendsSequelize]
        });
        assert.deepEqual(friendRequest, null);
        assert.deepEqual(friendStatus.user_one, user1.id);
        assert.deepEqual(findFriends.friends[0].user_two, user2.id);
    });

    it('should fetch all the friends', async () => {
        const user1 = await userFind('donald');
        const result: IFindFriendsResultsPSQL = await connection.query(
            getFriends({id: user1.id}),
            {logging: true});
        const resultRows: IFindFriendsResultsMapped = result[0].map(resultRow => resultRow);
        assert.deepEqual(resultRows[0].friendUserName, 'battletoads')
    });

    xit('should delete a user', async () => {

        await  findUser().then(user => user.destroy());

        const checkIfDeleted: IUserInstance = await findUser();
        assert.strictEqual(checkIfDeleted, null);
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
                        const transformBackToArray: any = (decrypt as any).toObject({arrays: true});
                        return assert.deepEqual(payload[0].dataValues.id, transformBackToArray.images[0].dataValues.id);
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
