import * as dotenv from 'dotenv';
dotenv.config();

/**
 * Sequelize Configuration for the following environments:
 * - development
 * - test
 * - production
 */

export const configOptions = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: 'postgres',
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
  },
};
