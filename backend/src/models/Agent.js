const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Agent = sequelize.define('Agent', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  type: {
    type: DataTypes.ENUM('chat', 'voice', 'email', 'data', 'custom'),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'training', 'error'),
    defaultValue: 'inactive'
  },
  configuration: {
    type: DataTypes.JSON,
    defaultValue: {}
  },
  prompt: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  model: {
    type: DataTypes.STRING(100),
    defaultValue: 'gpt-4'
  },
  tools: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  runCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  lastRunAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  createdById: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  storeId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'stores',
      key: 'id'
    }
  }
}, {
  tableName: 'agents',
  timestamps: true,
  indexes: [
    { fields: ['type'] },
    { fields: ['status'] },
    { fields: ['createdById'] },
    { fields: ['storeId'] }
  ]
});

module.exports = Agent;
