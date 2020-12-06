'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('deliveries', [
      {
        id: 1,
        type: 'Store_Pickup',
        city: 'Kharkiv',
        street: 'Naukova',
        house_number: '14',
        appartment_number: null,
        shipping_price: 0,
        fkOrderId:1
      },
      {
        id: 2,
        type: 'Mail_Pickup',
        city: 'Kyiv',
        street: 'Vesnyana',
        house_number: '24a',
        appartment_number: null,
        shipping_price: 40,
        fkOrderId: 2
      },
  ], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('deliveries', null, {});
  }
};