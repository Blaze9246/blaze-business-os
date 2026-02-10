const sequelize = require('../config/database');
const User = require('./User');
const Task = require('./Task');
const Store = require('./Store');
const Workflow = require('./Workflow');
const Agent = require('./Agent');

// Define associations
User.hasMany(Task, { foreignKey: 'assignedToId', as: 'assignedTasks' });
User.hasMany(Task, { foreignKey: 'createdById', as: 'createdTasks' });
User.hasMany(Store, { foreignKey: 'ownerId', as: 'stores' });
User.hasMany(Workflow, { foreignKey: 'createdById', as: 'workflows' });
User.hasMany(Agent, { foreignKey: 'createdById', as: 'agents' });

Task.belongsTo(User, { foreignKey: 'assignedToId', as: 'assignedTo' });
Task.belongsTo(User, { foreignKey: 'createdById', as: 'createdBy' });

Store.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });
Store.hasMany(Workflow, { foreignKey: 'storeId', as: 'workflows' });
Store.hasMany(Agent, { foreignKey: 'storeId', as: 'agents' });

Workflow.belongsTo(User, { foreignKey: 'createdById', as: 'createdBy' });
Workflow.belongsTo(Store, { foreignKey: 'storeId', as: 'store' });

Agent.belongsTo(User, { foreignKey: 'createdById', as: 'createdBy' });
Agent.belongsTo(Store, { foreignKey: 'storeId', as: 'store' });

module.exports = {
  sequelize,
  User,
  Task,
  Store,
  Workflow,
  Agent
};
