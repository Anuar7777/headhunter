"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("cities", [
      { name: "Астана", country_id: 1 },
      { name: "Алматы", country_id: 1 },
      { name: "Москва", country_id: 2 },
      { name: "Санкт-Петербург", country_id: 2 },
      { name: "Нью-Йорк", country_id: 3 },
      { name: "Вашингтон", country_id: 3 },
      { name: "Берлин", country_id: 4 },
      { name: "Париж", country_id: 5 },
      { name: "Рим", country_id: 6 },
      { name: "Ташкент", country_id: 7 },
      { name: "Пекин", country_id: 8 },
      { name: "Стамбул", country_id: 9 },
      { name: "Токио", country_id: 10 },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("cities", null, {});
  },
};
