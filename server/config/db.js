// config/db.js
require('dotenv').config();
const { Sequelize } = require('sequelize');

const {
  DB_HOST = 'localhost',
  DB_PORT = 3306,
  DB_NAME = 'gupio_tasks',
  DB_USER = 'root',
  DB_PASS = 'Prajwal@2004'
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql',
  logging: false,
  define: {
    timestamps: false
  }
});

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('MySQL Connected');

    // sync models with database
    await sequelize.sync();
    console.log('Models synced');
  } catch (err) {
    console.error('DB connection error:', err);
    process.exit(1);
  }
}

module.exports = { sequelize, connectDB };
