'use strict';

import { Sequelize } from 'sequelize';
const env = process.env.NODE_ENV || 'development';
import { configOptions } from '../config/config';
const config = configOptions[env];

let sequelize: Sequelize;
if (config.url) {
  sequelize = new Sequelize(config.url, config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
  );
}

export default sequelize;
