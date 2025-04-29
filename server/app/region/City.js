const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");
const Country = require("./Country");

const City = sequelize.define(
  "City",
  {
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "cities",
    timestamps: false,
  }
);

City.belongsTo(Country, { foreignKey: "country_id" });

module.exports = City;
