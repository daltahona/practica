const Sequelize = require('sequelize');

const DB_NAME = 'assistance_da';

const DB_USER = 'root';

const DB_PASS = 'MiNiCo57**';



export const database = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASS,

    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    }

);


async function generateDb() {
    await database.sync({ force: false })
    console.log('Base de datos y tablas creada');
}

generateDb();
