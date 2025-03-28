'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const date = new Date();

    await queryInterface.bulkDelete('wallets', null, {
      truncate: true,
      cascade: true,
    });

    await queryInterface.bulkInsert(
      'wallets',
      [
        {
          id: '829ee5de-173f-43ac-9837-95cea7df9dc4',
          user_id: 'e6c72343-dceb-470e-9446-b95c6997ec33',
          balance: 50000.0,
          created_at: date,
          updated_at: date,
        },
        {
          id: 'ed6390cb-1206-425d-91db-266fb44dacc7',
          user_id: '7b169f98-f0b7-4a09-b0da-edc6ee073acd',
          balance: 100000.0,
          created_at: date,
          updated_at: date,
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('wallets', null, {});
  },
};
