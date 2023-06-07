import { Sequelize } from 'sequelize';

const { NODE_ENV } = process.env;
const connectionString = NODE_ENV === 'test' ? 'test_db' : 'development_db';
const db = new Sequelize(connectionString, 'devHugo', '1q2w3e', {
  host: 'localhost',
  dialect: 'mysql',
});

export default db;
