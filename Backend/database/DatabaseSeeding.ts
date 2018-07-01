import { ImageSequelize } from './Sequelize/Tables/ImageSequelize';
import { UserSequelize } from './Sequelize/Tables/UserSequelize';

const createDatabaseEntries = async (user): Promise<void> =>
{
    for (let i = 0; i < 100; i++)
    {
        await  ImageSequelize.create({
            url        : 'https://placeholdit.imgix.net/~text?txtsize=33&txt=256%C3%97180&w=256&h=180',
            description: `this is image ${i}`,
            title      : `title of image ${i}`,
            user_id    : user.id,
        });
    }

};
/**
 * crappy database seeding functions
 * @returns {Promise<void>}
 */
export const createDummyImages = async () =>
{

    const user = await UserSequelize.create({
        email       : 'donald@duck.com',
        userName    : `donald`,
        password    : 'donny',
        localAccount: true,
        avatar      : 'http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png',
        enabled     : true,
    });
    await createDatabaseEntries(user);


};

