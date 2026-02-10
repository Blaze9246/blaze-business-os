module.exports = async function (fastify, opts) {
  // Get all AI agents
  fastify.get('/', async (request, reply) => {
    return {
      agents: [
        {
          id: '1',
          name: 'Hunter',
          role: 'Lead Manager',
          slug: 'hunter',
          description: 'Daily lead discovery and qualification',
          status: 'active',
          total_tasks_completed: 142,
          success_rate: 94.5,
          capabilities: ['lead_discovery', 'email_finding', 'qualification']
        },
        {
          id: '2',
          name: 'Outreach',
          role: 'Email Manager',
          slug: 'outreach',
          description: 'Automated cold email campaigns',
          status: 'active',
          total_tasks_completed: 89,
          success_rate: 87.2,
          capabilities: ['email_campaigns', 'crm_sync', 'follow_ups']
        },
        {
          id: '3',
          name: 'Creator',
          role: 'Content Manager',
          slug: 'creator',
          description: 'Instagram content generation',
          status: 'busy',
          total_tasks_completed: 256,
          success_rate: 91.8,
          capabilities: ['carousel_creation', 'caption_writing', 'hashtag_optimization']
        },
        {
          id: '4',
          name: 'Auditor',
          role: 'Operations Manager',
          slug: 'auditor',
          description: 'Shopify store audits and analysis',
          status: 'active',
          total_tasks_completed: 67,
          success_rate: 98.1,
          capabilities: ['store_audits', 'opportunity_detection', 'report_generation']
        },
        {
          id: '5',
          name: 'Operator',
          role: 'Operations Manager',
          slug: 'operator',
          description: 'Shopify and Systeme.io automation',
          status: 'offline',
          total_tasks_completed: 178,
          success_rate: 92.4,
          capabilities: ['shopify_automation', 'systeme_io_sync', 'blog_posting']
        },
        {
          id: '6',
          name: 'Reporter',
          role: 'Analytics Manager',
          slug: 'reporter',
          description: 'Daily briefings and client reporting',
          status: 'active',
          total_tasks_completed: 45,
          success_rate: 96.0,
          capabilities: ['daily_briefings', 'revenue_tracking', 'white_label_reports']
        }
      ]
    };
  });

  // Get agent by ID
  fastify.get('/:id', async (request, reply) => {
    const { id } = request.params;
    return {
      agent: {
        id,
        name: `Agent ${id}`,
        status: 'active',
        current_task: null
      }
    };
  });
};
