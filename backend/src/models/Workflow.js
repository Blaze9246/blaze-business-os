const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Workflow = sequelize.define('Workflow', {
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
    type: DataTypes.ENUM('automation', 'approval', 'notification', 'integration', 'custom'),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('draft', 'active', 'paused', 'archived'),
    defaultValue: 'draft'
  },
  trigger: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: {}
  },
  steps: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: []
  },
  conditions: {
    type: DataTypes.JSON,
    defaultValue: {}
  },
  schedule: {
    type: DataTypes.STRING(100),
    allowNull: true
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
  tableName: 'workflows',
  timestamps: true,
  indexes: [
    { fields: ['type'] },
    { fields: ['status'] },
    { fields: ['createdById'] },
    { fields: ['storeId'] }
  ]
});

module.exports = Workflow;
