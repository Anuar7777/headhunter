const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/db");

const ForeignLanguage = sequelize.define(
  "ForeignLanguage",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    level: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "ForeignLanguage",
    timestamps: false,
  }
);

module.exports = ForeignLanguage;
