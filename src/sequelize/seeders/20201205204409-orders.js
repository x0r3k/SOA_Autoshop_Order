'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('orders', [
      {
        id: 1,
        status: 'New',
        promo: null,
        product_total: 168.4,
        discount_total: 168.4,
        grand_total: 168.4,
        name: "Kirill",
        lastname: null,
        fullname:"Kirill",
        mobile: "123456",
        receiver_name: "Kirill",
        receiver_lastname: null, 
        receiver_fullname: "Kirill",
        receiver_mobile: "123456",
        fkUserId:3
      },
      {
        id: 2,
        status: 'Complete',
        promo: null,
        product_total: 195.6,
        discount_total: 195.6,
        grand_total: 235.6,
        name: "Vadim",
        lastname: null,
        fullname:"Vadim",
        mobile: "123456",
        receiver_name: "Nastya",
        receiver_lastname: null, 
        receiver_fullname: "Nastya",
        receiver_mobile: "654321",
        fkUserId:4
      }
  ], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('orders', null, {});
  }
};