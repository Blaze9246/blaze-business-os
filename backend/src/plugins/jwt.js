const fp = require('fastify-plugin');
const config = require('../config');

async function jwtPlugin(fastify, options) {
  await fastify.register(require('@fastify/jwt'), {
    secret: config.jwt.secret,
    sign: {
      expiresIn: config.jwt.expiresIn
    },
    decode: { complete: true }
  });

  // Add authentication decorator
  fastify.decorate('authenticate', async function(request, reply) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.code(401).send({
        success: false,
        error: 'Unauthorized',
        message: 'Invalid or expired token'
      });
    }
  });

  // Add optional authentication decorator
  fastify.decorate('optionalAuth', async function(request, reply) {
    try {
      await request.jwtVerify();
    } catch (err) {
      request.user = null;
    }
  });
}

module.exports = fp(jwtPlugin);
