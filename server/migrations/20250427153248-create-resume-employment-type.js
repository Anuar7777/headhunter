"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ResumeEmploymentTypes", {
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
      employment_type_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "employment_types", 
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ResumeEmploymentTypes");
  },
};
