module.exports = async function (fastify, opts) {
  // Get all tasks
  fastify.get('/', async (request, reply) => {
    return {
      tasks: [
        {
          id: '1',
          title: 'Complete product descriptions for Essora',
          description: 'Write SEO-optimized descriptions for 54 skincare products',
          status: 'in_progress',
          priority: 'high',
          assigned_to_agent_id: '3',
          assigned_to_user_id: null,
          store_id: '1',
          due_date: '2026-02-10T23:59:59Z',
          completed_at: null,
          tags: ['content', 'seo', 'essora']
        },
        {
          id: '2',
          title: 'Generate Instagram carousel posts',
          description: 'Create 5 carousel posts for Essora Instagram',
          status: 'todo',
          priority: 'medium',
          assigned_to_agent_id: '3',
          assigned_to_user_id: null,
          store_id: '1',
          due_date: '2026-02-12T23:59:59Z',
          completed_at: null,
          tags: ['social', 'instagram', 'essora']
        },
        {
          id: '3',
          title: 'Daily lead discovery - E-commerce stores',
          description: 'Find 10 qualified e-commerce leads for outreach',
          status: 'done',
          priority: 'high',
          assigned_to_agent_id: '1',
          assigned_to_user_id: null,
          store_id: null,
          due_date: '2026-02-09T12:00:00Z',
          completed_at: '2026-02-09T10:30:00Z',
          tags: ['leads', 'hunter']
        },
        {
          id: '4',
          title: 'Shopify audit for Woolworths prospect',
          description: 'Run comprehensive store audit and generate PDF report',
          status: 'review',
          priority: 'urgent',
          assigned_to_agent_id: '4',
          assigned_to_user_id: null,
          store_id: null,
          due_date: '2026-02-09T17:00:00Z',
          completed_at: null,
          tags: ['audit', 'woolworths', 'report']
        },
        {
          id: '5',
          title: 'Setup Stripe integration',
          description: 'Configure Stripe payment processing for Blaze Video Pro',
          status: 'todo',
          priority: 'medium',
          assigned_to_agent_id: null,
          assigned_to_user_id: '1',
          store_id: null,
          due_date: '2026-02-15T23:59:59Z',
          completed_at: null,
          tags: ['stripe', 'payments', 'integration']
        }
      ]
    };
  });

  // Create task
  fastify.post('/', async (request, reply) => {
    return {
      message: 'Task created successfully',
      task: request.body
    };
  });

  // Update task
  fastify.put('/:id', async (request, reply) => {
    const { id } = request.params;
    return {
      message: 'Task updated successfully',
      task: { id, ...request.body }
    };
  });

  // Delete task
  fastify.delete('/:id', async (request, reply) => {
    const { id } = request.params;
    return {
      message: 'Task deleted successfully',
      id
    };
  });
};
