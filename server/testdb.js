require('dotenv').config();
const { sequelize } = require('./config/db');

sequelize.authenticate()
  .then(() => {
    console.log("MySQL connection OK");
    return sequelize.query("SELECT 1+1 AS result");
  })
  .then(([rows]) => {
    console.log("Test query result:", rows);
    process.exit(0);
  })
  .catch(err => {
    console.error("DB ERROR:", err);
    process.exit(1);
  });
