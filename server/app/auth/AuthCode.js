const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const AuthCode = sequelize.define(
  "AuthCode",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    valid_till: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "auth_codes",
    timestamps: false,
  }
);

module.exports = AuthCode;
