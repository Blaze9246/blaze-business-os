const { User } = require('../models');
const { hashPassword } = require('../utils/hash');
const { authenticateUser, generateToken } = require('../utils/auth');
const { successResponse, errorResponse } = require('../utils/response');

async function register(request, reply) {
  try {
    const { email, password, firstName, lastName } = request.body;

    // Check if user exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return reply.code(409).send(
        errorResponse('User already exists', 'Email is already registered', 409)
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName
    });

    // Generate token
    const token = await generateToken(request.server, user);

    return reply.code(201).send(
      successResponse(
        {
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role
          },
          token
        },
        'User registered successfully'
      )
    );
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send(
      errorResponse(error.message, 'Registration failed', 500)
    );
  }
}

async function login(request, reply) {
  try {
    const { email, password } = request.body;

    const user = await authenticateUser(email, password);
    
    if (!user) {
      return reply.code(401).send(
        errorResponse('Invalid credentials', 'Email or password is incorrect', 401)
      );
    }

    const token = await generateToken(request.server, user);

    return reply.send(
      successResponse(
        {
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role
          },
          token
        },
        'Login successful'
      )
    );
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send(
      errorResponse(error.message, 'Login failed', 500)
    );
  }
}

async function me(request, reply) {
  try {
    const user = await User.findByPk(request.user.id, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return reply.code(404).send(
        errorResponse('User not found', 'User not found', 404)
      );
    }

    return reply.send(successResponse(user));
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send(
      errorResponse(error.message, 'Failed to get user', 500)
    );
  }
}

async function refresh(request, reply) {
  try {
    const user = await User.findByPk(request.user.id);
    
    if (!user || !user.isActive) {
      return reply.code(401).send(
        errorResponse('Invalid user', 'User not found or inactive', 401)
      );
    }

    const token = await generateToken(request.server, user);

    return reply.send(
      successResponse({ token }, 'Token refreshed successfully')
    );
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send(
      errorResponse(error.message, 'Token refresh failed', 500)
    );
  }
}

module.exports = {
  register,
  login,
  me,
  refresh
};
