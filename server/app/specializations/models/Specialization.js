const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/db");
const SpecializationType = require("./SpecializationType");

const Specialization = sequelize.define(
  "Specialization",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Specialization",
    timestamps: false,
  }
);

Specialization.belongsTo(SpecializationType, {
  foreignKey: "specialization_type_id",
});
SpecializationType.hasMany(Specialization, {
  foreignKey: "specialization_type_id",
  as: "specializations",
});

module.exports = Specialization;
