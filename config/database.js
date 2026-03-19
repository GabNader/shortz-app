const {Sequelize} = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect:'mysql',
        logging: false, //liga ou delisga o log do banco
        define: {
            timestamps: true, //adiciona os campos createdAt e updatedAt
            underscored: true, //usa snake_case para os nomes dos campos
        }
    }
);

module.exports = sequelize;