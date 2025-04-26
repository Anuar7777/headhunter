const { DataTypes } = require("sequelize");
const Role = require("./Role");
const Company = require("./Company");
const sequelize = require("../../config/db");

const User = sequelize.define(
  "User",
  {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

User.belongsTo(Role, { foreignKey: "role_id" });
User.belongsTo(Company, { foreignKey: "company_id" });

module.exports = User;
