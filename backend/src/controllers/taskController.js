const { Task, User } = require('../models');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/response');

async function getAll(request, reply) {
  try {
    const { page = 1, limit = 20, status, priority, assignedToId } = request.query;
    const offset = (page - 1) * limit;

    const where = {};
    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (assignedToId) where.assignedToId = assignedToId;

    const { count, rows: tasks } = await Task.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [
        { model: User, as: 'assignedTo', attributes: ['id', 'email', 'firstName', 'lastName'] },
        { model: User, as: 'createdBy', attributes: ['id', 'email', 'firstName', 'lastName'] }
      ],
      order: [['createdAt', 'DESC']]
    });

    return reply.send(
      paginatedResponse(tasks, { page: parseInt(page), limit: parseInt(limit), total: count })
    );
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send(
      errorResponse(error.message, 'Failed to fetch tasks', 500)
    );
  }
}

async function getById(request, reply) {
  try {
    const { id } = request.params;

    const task = await Task.findByPk(id, {
      include: [
        { model: User, as: 'assignedTo', attributes: ['id', 'email', 'firstName', 'lastName'] },
        { model: User, as: 'createdBy', attributes: ['id', 'email', 'firstName', 'lastName'] }
      ]
    });

    if (!task) {
      return reply.code(404).send(
        errorResponse('Task not found', 'Task not found', 404)
      );
    }

    return reply.send(successResponse(task));
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send(
      errorResponse(error.message, 'Failed to fetch task', 500)
    );
  }
}

async function create(request, reply) {
  try {
    const { title, description, priority, dueDate, assignedToId, tags, metadata } = request.body;

    const task = await Task.create({
      title,
      description,
      priority: priority || 'medium',
      dueDate,
      assignedToId,
      tags: tags || [],
      metadata: metadata || {},
      createdById: request.user.id
    });

    return reply.code(201).send(
      successResponse(task, 'Task created successfully')
    );
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send(
      errorResponse(error.message, 'Failed to create task', 500)
    );
  }
}

async function update(request, reply) {
  try {
    const { id } = request.params;
    const { title, description, status, priority, dueDate, assignedToId, tags, metadata } = request.body;

    const task = await Task.findByPk(id);

    if (!task) {
      return reply.code(404).send(
        errorResponse('Task not found', 'Task not found', 404)
      );
    }

    const updateData = {
      ...(title && { title }),
      ...(description !== undefined && { description }),
      ...(status && { status }),
      ...(priority && { priority }),
      ...(dueDate !== undefined && { dueDate }),
      ...(assignedToId !== undefined && { assignedToId }),
      ...(tags && { tags }),
      ...(metadata && { metadata })
    };

    if (status === 'completed' && task.status !== 'completed') {
      updateData.completedAt = new Date();
    }

    await task.update(updateData);

    return reply.send(successResponse(task, 'Task updated successfully'));
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send(
      errorResponse(error.message, 'Failed to update task', 500)
    );
  }
}

async function remove(request, reply) {
  try {
    const { id } = request.params;

    const task = await Task.findByPk(id);

    if (!task) {
      return reply.code(404).send(
        errorResponse('Task not found', 'Task not found', 404)
      );
    }

    await task.destroy();

    return reply.send(successResponse(null, 'Task deleted successfully'));
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send(
      errorResponse(error.message, 'Failed to delete task', 500)
    );
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
