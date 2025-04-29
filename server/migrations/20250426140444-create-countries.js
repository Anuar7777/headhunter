"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("countries", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("countries");
  },
};
