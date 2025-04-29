const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Resume = require("./Resume");

const Education = sequelize.define(
  "Education",
  {
    level: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    university_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    faculty: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    major: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "Education",
    timestamp: false,
  }
);

Education.belongsTo(Resume, { foreignKey: "resume_id" });

module.exports = Education;
