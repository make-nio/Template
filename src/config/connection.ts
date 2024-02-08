import { Sequelize } from 'sequelize';

const sql: Sequelize = new Sequelize(
    process.env.DB_NAME || '',
    process.env.DB_USER || 'SA',
    process.env.DB_PASS || '{4lt0p4SW0rD}-[v13j4]',
    {
        host: process.env.DB_HOST || '19.168.1.103',
        dialect: 'mssql',
        logging: false,
    }
);

export default sql;
