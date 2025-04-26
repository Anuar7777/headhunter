"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      full_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "roles",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      company_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "companies",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("users");
  },
};
