const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Company = sequelize.define(
  "Company",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "companies",
    timestamps: false,
  }
);

module.exports = Company;
