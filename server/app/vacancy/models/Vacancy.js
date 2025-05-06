const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/db");
const Specialization = require("../../specializations/models/Specialization");
const City = require("../../region/City");
const Experience = require("./Experience");
const EmploymentType = require("../../employment-types/EmploymentType");
const Company = require("../../auth/Company");
const User = require("../../auth/User");

const Vacancy = sequelize.define(
  "Vacancy",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salary_from: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    salary_to: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    salary_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    skills: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    about_company: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    main_language: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    skills: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "Vacancy",
    underscored: true,
  }
);

Vacancy.belongsTo(City, { foreignKey: "city_id", as: "city" });
Vacancy.belongsTo(Company, { foreignKey: "company_id", as: "company" });
Vacancy.belongsTo(User, { foreignKey: "user_id", as: "creator" });
Vacancy.belongsTo(Specialization, {
  foreignKey: "specialization_id",
  as: "specialization",
});
Vacancy.belongsTo(Experience, {
  foreignKey: "experience_id",
  as: "experience",
});
Vacancy.belongsTo(EmploymentType, {
  foreignKey: "employment_type_id",
  as: "employment_type",
});

module.exports = Vacancy;
