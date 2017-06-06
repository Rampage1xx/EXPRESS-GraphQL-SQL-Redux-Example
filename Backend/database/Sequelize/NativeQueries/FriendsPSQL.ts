
export const getFriends = ({id}) => `
SELECT
  users."userName" AS "userName",
  friends.user_two AS "friendID",
  u2."userName"    AS "friendUserName",
  u2.online        AS "friendOnline"
FROM users
  INNER JOIN friends ON users.id = friends.user_one
  INNER JOIN users u2 ON friends.user_two = u2.id
WHERE users.id= '${id}';`;

