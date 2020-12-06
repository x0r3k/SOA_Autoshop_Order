'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('order_carts', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      price: {
        type: Sequelize.FLOAT(8,2),
        allowNull: false,
      },
      discount: {
        type: Sequelize.FLOAT(5,2),
        allowNull: true,
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      fkOrderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: 'fkProductId_fkOrderId_unique',
        references: {
          model: {
            tableName: 'orders',
            key: 'id',
          },
        },
      },
      fkProductId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: 'fkProductId_fkOrderId_unique',
      }
    },{
      uniqueKeys: {
        fkProductId_fkOrderId_unique: {
          customIndex: true,
          fields: ['fkOrderId', 'fkProductId'],
        },
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('order_carts');
  }
};