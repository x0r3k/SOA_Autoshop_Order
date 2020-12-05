'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('deliveries', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      type: {
        type: Sequelize.ENUM('Courier', 'Store_Pickup', 'Mail_Pickup'),
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      street: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      house_number: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      appartment_number: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      shipping_price: {
        type: Sequelize.FLOAT(5,2),
        allowNull: false
      },
      fkOrderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'orders',
            key: 'id',
          },
        },
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('deliveries');
  }
};