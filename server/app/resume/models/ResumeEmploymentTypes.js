const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Resume = require("./Resume");
const EmploymentType = require("../../employment-types/EmploymentType");

const ResumeEmploymentType = sequelize.define(
  "ResumeEmploymentType",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    timestamps: false,
  }
);

Resume.belongsToMany(Resume, { through: ResumeEmploymentType });
EmploymentType.belongsToMany(EmploymentType, {
  through: ResumeEmploymentType,
});

module.exports = ResumeEmploymentType;
