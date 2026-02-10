const { Sequelize } = require('sequelize');
const config = require('../config');

let sequelize;

if (config.database.dialect === 'sqlite') {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: config.database.storage,
    logging: config.database.logging
  });
} else {
  sequelize = new Sequelize(
    config.database.database,
    config.database.username,
    config.database.password,
    {
      host: config.database.host,
      port: config.database.port,
      dialect: config.database.dialect,
      logging: config.database.logging,
      pool: config.database.pool
    }
  );
}

module.exports = sequelize;
