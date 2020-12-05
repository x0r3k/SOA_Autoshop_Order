'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('transactions', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      type: {
        type: Sequelize.ENUM('Online', 'Cash', 'Cheque'),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('New', 'Cancelled', 'Failed', 'Pending', 'Declined', 'Rejected', 'Success'),
        allowNull: false,
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
    await queryInterface.dropTable('transactions');
  }
};