import * as moment from 'moment';
import {v4} from 'uuid/v4';

interface IResolveFriendshipParameters {
    (parameters: { status: string; user_one: string; user_two: string; })
}

const resolvePendingFriendship: IResolveFriendshipParameters = ({status, user_one, user_two}) => {
    const secondQuery = defineSecondQuery({status, user_one, user_two});

    return (`
DELETE FROM friend_requests
WHERE user_one='${user_one}'
AND   user_two='${user_two}';
${secondQuery};`);
};

const defineSecondQuery: IResolveFriendshipParameters = ({status, user_one, user_two}): null | string => {
    if (status === 'REJECTED') {
        return null;
    }
    const queryStatus = ['HAS'.concat(status), 'IS'.concat(status)];
    return ( `
INSERT INTO friends(id, user_one, user_two, status, user_id, created_at, updated_at)
VALUES ('${v4()}','${user_one}', '${user_two}', '${queryStatus[0]}','${user_one}','${moment()}', '${moment()}'),
('${v4()}','${user_two}', '${user_one}', '${queryStatus[1]}','${user_two}', '${moment()}','${moment()}');
`);

};

export {resolvePendingFriendship};
