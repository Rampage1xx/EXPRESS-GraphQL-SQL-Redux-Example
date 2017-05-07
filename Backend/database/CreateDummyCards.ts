import {ImagesSequelize, UsersSequelize} from './SequelizeTables';

const createDatabaseEntries = (user) => {
    for (let i = 0; i < 100; i++) {
        ImagesSequelize.create({
            url: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=256%C3%97180&w=256&h=180',
            description: `this is image ${i}`,
            title: `title of image ${i}`,
            userName: user.twitterUsername,
            avatar: 'http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png',
            user_id: user.id
        }).then(r => r)
            .catch(e => e);
    }
    return null;

};

export const createDummyImages = () => {
    UsersSequelize.create({
        email: 'donald@duck.com',
        userName: 'donald',
        password: 'donny',
        localAccount: true,
        avatar: 'http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png'
    })
        .then(user => createDatabaseEntries(user))
        .catch(e => e);
    return null;
};

