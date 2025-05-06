const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");
const Resume = require("../resume/models/Resume");
const Vacancy = require("../vacancy/models/Vacancy");

const Apply = sequelize.define(
  "Apply",
  {
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Apply",
    underscored: true,
  }
);

Resume.belongsTo(Resume, { foreignKey: "resume_id" });
Resume.belongsTo(Vacancy, { foreignKey: "vacancy_id" });

module.exports = Apply;
