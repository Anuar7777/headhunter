"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("resume", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      birthday: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      about: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      position: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      salary: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      salary_type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      main_language: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      skills: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      citizenship: {
        type: Sequelize.INTEGER,
        references: {
          model: "countries",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      city_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "cities",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("resume");
  },
};
