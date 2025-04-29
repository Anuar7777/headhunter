const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const EmploymentType = sequelize.define(
  "EmploymentType",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "employment_types",
    timestamps: false,
  }
);

module.exports = EmploymentType;
