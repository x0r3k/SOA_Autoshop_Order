'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('order_carts', [
      {
        id: 1,
        price: 85,
        discount: 0,
        amount: 1,
        fkOrderId:1,
        fkProductId:1
      },
      {
        id: 2,
        price: 83.4,
        discount: 0,
        amount: 1,
        fkOrderId:1,
        fkProductId:2
      },
      {
        id: 3,
        price: 88.2,
        discount: 0,
        amount: 1,
        fkOrderId:2,
        fkProductId:3
      },
      {
        id: 4,
        price: 107.4,
        discount: 0,
        amount: 1,
        fkOrderId:2,
        fkProductId:4
      }
  ], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('order_carts', null, {});
  }
};