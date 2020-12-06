'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('shopping_carts', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      fkUserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: 'fkProductId_fkUserId_unique',
      },
      fkProductId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: 'fkProductId_fkUserId_unique',
      }
    },{
      uniqueKeys: {
        fkProductId_fkUserId_unique: {
          customIndex: true,
          fields: ['fkUserId', 'fkProductId'],
        },
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('shopping_carts');
  }
};