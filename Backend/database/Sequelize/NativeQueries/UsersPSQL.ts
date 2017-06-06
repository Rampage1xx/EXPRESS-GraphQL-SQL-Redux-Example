export const onlineStatusPSQL = ({id, online}) => `
        UPDATE users
        SET online='${online}'
        WHERE id='${id}';
`;
