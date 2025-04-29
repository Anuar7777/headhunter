"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("countries", [
      { name: "Казахстан" },
      { name: "Россия" },
      { name: "США" },
      { name: "Германия" },
      { name: "Франция" },
      { name: "Италия" },
      { name: "Узбекистан" },
      { name: "Китай" },
      { name: "Турция" },
      { name: "Япония" },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("countries", null, {});
  },
};
