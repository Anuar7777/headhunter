const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/db");
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

Resume.belongsToMany(EmploymentType, {
  through: ResumeEmploymentType,
  foreignKey: "resume_id",
  otherKey: "employment_type_id",
  as: "employment_types",
});

EmploymentType.belongsToMany(Resume, {
  through: ResumeEmploymentType,
  foreignKey: "employment_type_id",
  otherKey: "resume_id",
});

module.exports = ResumeEmploymentType;
