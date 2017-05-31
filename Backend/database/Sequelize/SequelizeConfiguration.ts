import * as Sequelize from 'sequelize';

const NODE_TEST: boolean = (process.env.NODE_ENV === 'test');
const database: string = NODE_TEST ? 'test' : 'pinit';
const host: string = NODE_TEST ? 'postgres' : 'postgres';
 const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 const connection: Sequelize.Sequelize = new Sequelize(`${database}`, 'meeseeks', 'MEESEEKS', {
    host: `${host}`,
    //  port: 5432,
    port: 5432,
    logging: false,
    dialect: 'postgres'

});


export { connection, sleep, host, database, NODE_TEST}
