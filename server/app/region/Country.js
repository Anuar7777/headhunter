const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Country = sequelize.define(
  "Country",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "countries",
    timestamps: false,
  }
);

module.exports = Country;
