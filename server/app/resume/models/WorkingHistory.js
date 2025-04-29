const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/db");
const Resume = require("./Resume");

const WorkingHistory = sequelize.define(
  "WorkingHistory",
  {
    company_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    responsibilities: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "WorkingHistory",
    timestamps: false,
  }
);

WorkingHistory.belongsTo(Resume, { foreignKey: "resume_id" });

module.exports = WorkingHistory;
