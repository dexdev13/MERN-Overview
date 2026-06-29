const authService = require('../services/auth.service');

/**
 * TODO: Implement register controller
 * POST /api/auth/register
 * - Gọi authService.register(req.body)
 * - Response 201: { success: true, data: user }
 */
async function register(req, res, next) {
  try {
    // TODO: implement
    const user = await authService.register(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
}

/**
 * TODO: Implement login controller
 * POST /api/auth/login
 * - Gọi authService.login(req.body)
 * - Response 200: { success: true, data: { token, expiresIn } }
 */
async function login(req, res, next) {
  try {
    // TODO: implement
    const data = await authService.login(req.body);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login };
