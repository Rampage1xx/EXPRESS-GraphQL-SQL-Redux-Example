
export const getFriends = ({id}) => `SELECT users."userName", friends.user_two AS "friendId", u2."userName" AS "friendUserName" FROM users
INNER JOIN friends ON users.id = friends.user_one
INNER JOIN users u2 ON friends.user_two = u2.id
WHERE users.id= '${id}';`;

