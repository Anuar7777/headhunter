const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/db");
const City = require("../../region/City");
const User = require("../../auth/User");
const Country = require("../../region/Country");

const Resume = sequelize.define(
  "resume",
  {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    about: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    salary: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    salary_type: {
      type: DataTypes.STRING,
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
    tableName: "resume",
    underscored: true,
  }
);

Resume.belongsTo(User, { foreignKey: "user_id" });
Resume.belongsTo(Country, { foreignKey: "citizenship" });
Resume.belongsTo(City, { foreignKey: "city_id" });

module.exports = Resume;
