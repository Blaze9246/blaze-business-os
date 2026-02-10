const { comparePassword } = require('../utils/hash');
const { User } = require('../models');

async function authenticateUser(email, password) {
  const user = await User.findOne({
    where: { email, isActive: true }
  });

  if (!user) {
    return null;
  }

  const isValid = await comparePassword(password, user.password);
  
  if (!isValid) {
    return null;
  }

  // Update last login
  await user.update({ lastLoginAt: new Date() });

  return user;
}

async function generateToken(fastify, user) {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role
  };

  return fastify.jwt.sign(payload);
}

module.exports = {
  authenticateUser,
  generateToken
};
