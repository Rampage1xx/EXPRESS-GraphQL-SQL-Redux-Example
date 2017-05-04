declare type oAuthTwitter = (token: any,
                             tokenSecret: any,
                             profile: {
                                 displayName: string,
                                 id: string,
                                 _json: {
                                     email: string,
                                     profile_background_image_url: string,
                                     profile_image_url: string
                                 }
                             },
                             cb: any) => any;

declare type oAuthGoogle = (request: any,
                            accessToken: any,
                            refreshToken: any,
                            profile: {
                                displayName: string;
                                email: string;
                                emails: [{ type: string, value: string }];
                                id: string;
                                name: {
                                    familyName: string,
                                    givenName: string
                                };
                                photos: [{ type: string, value: string }]

                            },
                            done: any) => any;

declare type profileParameters = {
    email: string,
    SocialDatabaseIDRow: string,
    SocialID: string,
    SocialDatabaseUsernameRow: string,
    socialDisplayName: string,
    avatar: string
};

declare type resultsDatabasePassport = { dataValues: { id: string } };