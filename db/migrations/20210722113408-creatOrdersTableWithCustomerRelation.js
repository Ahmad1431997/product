"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Orders", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      customerId: {
        type: Sequelize.INTEGER,

        references: {
          model: {
            tableName: "Users",
         
          },
          key: "id",
        },
        allowNull: false,
      },
      updatedAt: { type: Sequelize.DATE },
      createdAt: { type: Sequelize.DATE },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Orders");
  },
};
