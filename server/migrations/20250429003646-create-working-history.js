"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("WorkingHistory", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      resume_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "resume",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      company_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      company_description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      responsibilities: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("WorkingHistory");
  },
};
