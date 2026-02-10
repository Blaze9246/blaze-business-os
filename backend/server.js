const fastify = require('fastify')({ logger: true });
const cors = require('@fastify/cors');
const jwt = require('@fastify/jwt');
require('dotenv').config();

// Register plugins
fastify.register(cors, {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
});

fastify.register(jwt, {
  secret: process.env.JWT_SECRET || 'your-secret-key'
});

// Health check endpoint
fastify.get('/', async (request, reply) => {
  return { 
    status: 'ok', 
    message: 'Blaze Business OS API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  };
});

fastify.get('/health', async (request, reply) => {
  return { 
    status: 'healthy',
    timestamp: new Date().toISOString()
  };
});

// Routes
fastify.register(require('./src/routes/health'), { prefix: '/api/health' });
fastify.register(require('./src/routes/agents'), { prefix: '/api/agents' });
fastify.register(require('./src/routes/tasks'), { prefix: '/api/tasks' });
fastify.register(require('./src/routes/stores'), { prefix: '/api/stores' });
fastify.register(require('./src/routes/workflows'), { prefix: '/api/workflows' });

// Error handler
fastify.setErrorHandler((error, request, reply) => {
  fastify.log.error(error);
  reply.status(500).send({ 
    error: 'Internal Server Error',
    message: error.message
  });
});

// Start server
const start = async () => {
  try {
    const port = process.env.PORT || 3001;
    const host = process.env.HOST || '0.0.0.0';
    await fastify.listen({ port, host });
    fastify.log.info(`Server listening on ${host}:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
