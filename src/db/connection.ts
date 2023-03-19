import { Sequelize } from 'sequelize';
import config from '../config';

const database = config.database;
const username = config.dbUser;
const password = config.dbPassword;

if (!database || !username || !password) {
  throw new Error('Faltan parametros para la conexión');
}

const db = new Sequelize(database, username, password, {
  host: 'localhost',
  dialect: 'postgres',
  logging: true,
  define: { timestamps: false },
});

export default db;
