const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Resume = require("./Resume");

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
    timestamp: false,
  }
);

ForeignLanguage.belongsTo(Resume, { foreignKey: "resume_id" });

module.exports = ForeignLanguage;
