module.exports = async function (fastify, opts) {
  // Get all stores
  fastify.get('/', async (request, reply) => {
    return {
      stores: [
        {
          id: '1',
          name: 'Essora Skincare',
          slug: 'essora',
          shopify_domain: 'essora-skincare.myshopify.com',
          status: 'active',
          monthly_revenue_target: 50000,
          current_month_revenue: 24500,
          client_name: 'Amishka Asai',
          client_email: 'amishka@essora.com',
          last_sync_at: '2026-02-09T08:00:00Z'
        }
      ]
    };
  });

  // Get store by ID
  fastify.get('/:id', async (request, reply) => {
    const { id } = request.params;
    return {
      store: {
        id,
        name: 'Essora Skincare',
        slug: 'essora',
        shopify_domain: 'essora-skincare.myshopify.com',
        status: 'active',
        monthly_revenue_target: 50000,
        current_month_revenue: 24500,
        client_name: 'Amishka Asai',
        client_email: 'amishka@essora.com'
      }
    };
  });

  // Get store stats
  fastify.get('/:id/stats', async (request, reply) => {
    const { id } = request.params;
    return {
      store_id: id,
      stats: {
        total_sales: 24500,
        total_orders: 312,
        average_order_value: 78.53,
        conversion_rate: 2.8,
        traffic: {
          organic: 1250,
          paid: 890,
          social: 450
        }
      }
    };
  });
};
