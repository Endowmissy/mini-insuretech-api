// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

/**
 * Sequelize Configuration for the following environments:
 * - development
 * - test
 * - production
 */

module.exports = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: 'postgres',
  },
  production: {
    url: process.env.PROD_DATABASE_URL,
    dialect: 'postgres',
  },
};
