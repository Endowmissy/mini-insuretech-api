'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const date = new Date();

    await queryInterface.bulkDelete('users', null, {
      truncate: true,
      cascade: true,
    });

    await queryInterface.bulkInsert(
      'users',
      [
        {
          id: 'e6c72343-dceb-470e-9446-b95c6997ec33',
          first_name: 'John',
          last_name: 'Doe',
          email: 'johndoe@yahoo.com',
          status: 'active',
          created_at: date,
          updated_at: date,
        },
        {
          id: '7b169f98-f0b7-4a09-b0da-edc6ee073acd',
          first_name: 'Jane',
          last_name: 'Doe',
          email: 'doej@gmail.com',
          status: 'active',
          created_at: date,
          updated_at: date,
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
