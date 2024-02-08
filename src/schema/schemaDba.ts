import Sequelize from 'sequelize';
import sql from '../config/connection';


export const Ejemplo = sql.define(
    'Ejemplo',
    {
        // attributes
        Campo1: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            // allowNull defaults to true
        },
        Campo2: {
            type: Sequelize.STRING,
            // allowNull defaults to true
        },
        Campo3: {
            type: Sequelize.STRING,
            // allowNull defaults to true
        }
    },
    {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        // paranoid: true,
        // freezeTableName: true,
    }
);
