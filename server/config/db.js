const { Sequelize } = require("sequelize");
const config = require("./config").development;

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    logging: config.logging,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection to the database has been established succesfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

module.exports = sequelize;
