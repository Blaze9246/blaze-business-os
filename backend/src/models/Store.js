const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Store = sequelize.define('Store', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  platform: {
    type: DataTypes.ENUM('shopify', 'woocommerce', 'magento', 'bigcommerce', 'custom'),
    allowNull: false
  },
  platformStoreId: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  url: {
    type: DataTypes.STRING(500),
    allowNull: true,
    validate: {
      isUrl: true
    }
  },
  apiKey: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  apiSecret: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  accessToken: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'error', 'syncing'),
    defaultValue: 'active'
  },
  settings: {
    type: DataTypes.JSON,
    defaultValue: {}
  },
  metadata: {
    type: DataTypes.JSON,
    defaultValue: {}
  },
  lastSyncAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  ownerId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  }
}, {
  tableName: 'stores',
  timestamps: true,
  indexes: [
    { fields: ['platform'] },
    { fields: ['status'] },
    { fields: ['ownerId'] },
    { fields: ['platformStoreId'] }
  ]
});

module.exports = Store;
