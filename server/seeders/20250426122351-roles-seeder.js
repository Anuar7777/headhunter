"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("roles", [
      {
        name: "employee",
      },
      {
        name: "manager",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("roles", {
      name: {
        [Sequelize.Op.in]: ["employee", "manager"],
      },
    });
  },
};
