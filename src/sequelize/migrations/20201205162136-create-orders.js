'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('orders', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      status: {
        type: Sequelize.ENUM('New', 'Checkout', 'Paid', 'Failed', 'Shipped', 'Delivered', 'Returned', 'Complete'),
        allowNull: false,
      },
      promo: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      product_total: {
        type: Sequelize.FLOAT(8,2),
        allowNull: false,
      },
      discount_total: {
        type: Sequelize.FLOAT(8,2),
        allowNull: false,
      },
      grand_total: {
        type: Sequelize.FLOAT(8,2),
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      lastname: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      fullname: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      mobile: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      receiver_name: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      receiver_lastname: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      receiver_fullname: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      receiver_mobile: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      fkUserId: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('orders');
  }
};