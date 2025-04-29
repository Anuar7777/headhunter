"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("employment_types", [
      { name: "Полная занятость" },
      { name: "Частичная занятость" },
      { name: "Проектная работа" },
      { name: "Волонтерство" },
      { name: "Стажировка" },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("employment_types", null, {});
  },
};
