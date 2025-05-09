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

Apply.belongsTo(Resume, { foreignKey: "resume_id", as: "resume" });
Apply.belongsTo(Vacancy, { foreignKey: "vacancy_id", as: "vacancy" });

module.exports = Apply;
