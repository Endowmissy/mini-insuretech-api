'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const date = new Date();

    await queryInterface.bulkDelete('product_categories', null, {
      truncate: true,
      cascade: true,
    });

    await queryInterface.bulkInsert(
      'product_categories',
      [
        {
          id: '10d35e00-7510-461e-a46d-3f73a355a033',
          name: 'Health Category',
          description: 'Health related products',
          created_at: date,
          updated_at: date,
        },
        {
          id: 'bea4bd0d-b83b-40fc-84e7-cbc8331c00ef',
          name: 'Auto Category',
          description: 'Auto related products',
          created_at: date,
          updated_at: date,
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('product_categories', null, {});
  },
};
