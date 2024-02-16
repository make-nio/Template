import { Sequelize } from 'sequelize';

const sql: Sequelize = new Sequelize(
    process.env.DB_NAME || '',
    process.env.DB_USER || '',
    process.env.DB_PASS || '',
    {
        host: process.env.DB_HOST || '',
        dialect: 'mssql',
        logging: false,
    }
);

export default sql;
