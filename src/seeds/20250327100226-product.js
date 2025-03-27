'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const date = new Date();

    await queryInterface.bulkDelete('products', null, {
      truncate: true,
      cascade: true,
    });

    await queryInterface.bulkInsert(
      'products',
      [
        {
          id: '91431c04-ec4d-4642-b6ff-a8f8dea33dcd',
          product_category_id: '10d35e00-7510-461e-a46d-3f73a355a033',
          name: 'Optimal care mini',
          description: 'Mini health care product',
          price: 10000.0,
          created_at: date,
          updated_at: date,
        },
        {
          id: '24b55525-b040-49ae-bf82-36567725a5bf',
          product_category_id: '10d35e00-7510-461e-a46d-3f73a355a033',
          name: 'Optimal care standard',
          description: 'Standard health care product',
          price: 20000.0,
          created_at: date,
          updated_at: date,
        },
        {
          id: '17764e06-271a-4e03-8dd8-acdfe60ce91d',
          product_category_id: 'bea4bd0d-b83b-40fc-84e7-cbc8331c00ef',
          name: 'Third-party',
          description: 'Third-party auto product',
          price: 5000.0,
          created_at: date,
          updated_at: date,
        },
        {
          id: 'bb3e134a-d720-4ac6-b352-79ccf2c038e7',
          product_category_id: 'bea4bd0d-b83b-40fc-84e7-cbc8331c00ef',
          name: 'Comprehensive',
          description: 'Comprehensive auto product',
          price: 15000.0,
          created_at: date,
          updated_at: date,
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('products', null, {});
  },
};
