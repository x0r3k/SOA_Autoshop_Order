'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('transactions', [
      {
        id: 1,
        type: 'Online',
        status: 'New',
        fkOrderId:1
      },
      {
        id: 2,
        type: 'Cash',
        status: 'Success',
        fkOrderId: 2
      },
  ], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('transactions', null, {});
  }
};