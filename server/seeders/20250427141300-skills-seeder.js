"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("skills", [
      { name: "Разработка веб-приложений" },
      { name: "Мобильная разработка" },
      { name: "Анализ данных" },
      { name: "Дизайн интерфейсов" },
      { name: "Управление проектами" },
      { name: "Копирайтинг" },
      { name: "SEO-оптимизация" },
      { name: "Кибербезопасность" },
      { name: "Разработка игр" },
      { name: "Облачные технологии" },
      { name: "Искусственный интеллект" },
      { name: "Машинное обучение" },
      { name: "Тестирование ПО" },
      { name: "DevOps-инженерия" },
      { name: "Финансовый анализ" },
      { name: "Маркетинг" },
      { name: "Продажи" },
      { name: "Бизнес-анализ" },
      { name: "Обучение и развитие персонала" },
      { name: "Поддержка клиентов" },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("skills", null, {});
  },
};
