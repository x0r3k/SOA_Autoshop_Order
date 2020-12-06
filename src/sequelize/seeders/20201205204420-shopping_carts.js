'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('shopping_carts', [
      {
        id: 1,
        amount: 2,
        fkUserId:5,
        fkProductId:5
      },
      {
        id: 2,
        amount: 3,
        fkUserId:5,
        fkProductId:6
      },
  ], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('shopping_carts', null, {});
  }
};