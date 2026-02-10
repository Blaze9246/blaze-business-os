module.exports = async function (fastify, opts) {
  // Get all workflows
  fastify.get('/', async (request, reply) => {
    return {
      workflows: [
        {
          id: '1',
          name: 'Midnight Magic',
          slug: 'midnight-magic',
          description: 'Daily 3 AM automated builds with surprise tools/assets delivery',
          type: 'scheduled',
          schedule: '0 3 * * *',
          status: 'active',
          last_run_at: '2026-02-09T03:00:00Z',
          last_run_status: 'completed',
          run_count: 45
        },
        {
          id: '2',
          name: 'Shopify Store Audit',
          slug: 'shopify-audit',
          description: 'Automated Shopify store audits with PDF report generation',
          type: 'manual',
          schedule: null,
          status: 'active',
          last_run_at: '2026-02-08T14:30:00Z',
          last_run_status: 'completed',
          run_count: 67
        },
        {
          id: '3',
          name: 'Lead Hunter',
          slug: 'lead-hunter',
          description: 'Daily lead discovery - 10 qualified e-commerce leads',
          type: 'scheduled',
          schedule: '0 9 * * *',
          status: 'active',
          last_run_at: '2026-02-09T09:00:00Z',
          last_run_status: 'completed',
          run_count: 142
        },
        {
          id: '4',
          name: 'Content Forge',
          slug: 'content-forge',
          description: 'Instagram content generation and scheduling',
          type: 'scheduled',
          schedule: '0 10 * * 1,3,5',
          status: 'active',
          last_run_at: '2026-02-07T10:00:00Z',
          last_run_status: 'completed',
          run_count: 89
        },
        {
          id: '5',
          name: 'Blaze Crystal Ball',
          slug: 'crystal-ball',
          description: 'AI-powered market research and trend analysis',
          type: 'manual',
          schedule: null,
          status: 'paused',
          last_run_at: '2026-02-05T16:00:00Z',
          last_run_status: 'failed',
          run_count: 12
        },
        {
          id: '6',
          name: 'AI Office',
          slug: 'ai-office',
          description: 'Daily 5 AM automated tasks and system maintenance',
          type: 'scheduled',
          schedule: '0 5 * * *',
          status: 'active',
          last_run_at: '2026-02-09T05:00:00Z',
          last_run_status: 'completed',
          run_count: 78
        },
        {
          id: '7',
          name: 'Recipe Vault Sync',
          slug: 'recipe-vault-sync',
          description: 'Sync recipes from WhatsApp to backend database',
          type: 'scheduled',
          schedule: '0 */6 * * *',
          status: 'active',
          last_run_at: '2026-02-09T18:00:00Z',
          last_run_status: 'completed',
          run_count: 234
        },
        {
          id: '8',
          name: 'Campaign Generator V2',
          slug: 'campaign-generator-v2',
          description: 'Multi-channel campaign generation (Email, Facebook, Google)',
          type: 'manual',
          schedule: null,
          status: 'active',
          last_run_at: null,
          last_run_status: null,
          run_count: 0
        }
      ]
    };
  });

  // Run workflow
  fastify.post('/:id/run', async (request, reply) => {
    const { id } = request.params;
    return {
      message: 'Workflow execution started',
      execution_id: 'exec_' + Date.now(),
      workflow_id: id,
      status: 'running',
      started_at: new Date().toISOString()
    };
  });

  // Get workflow execution history
  fastify.get('/:id/executions', async (request, reply) => {
    const { id } = request.params;
    return {
      workflow_id: id,
      executions: [
        {
          id: 'exec_1',
          status: 'completed',
          started_at: '2026-02-09T03:00:00Z',
          completed_at: '2026-02-09T03:15:00Z',
          output: 'Generated 3 new assets'
        }
      ]
    };
  });
};
