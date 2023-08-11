const dotenv = require("dotenv");
dotenv.config();
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  "to_do",
  process.env.DB_Username,
  process.env.DB_Password,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

module.exports = sequelize;
