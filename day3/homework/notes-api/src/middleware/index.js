const jwt = require('jsonwebtoken');

/**
 * TODO: Implement validate middleware (copy từ bài tập 1)
 */
function validate(schema, source = 'body') {
  return (req, res, next) => {
    // TODO: implement
    next();
  };
}

/**
 * TODO: Implement authenticate middleware (copy từ bài tập 2)
 * - Đọc Authorization: Bearer <token>
 * - Verify JWT
 * - req.user = decoded
 */
function authenticate(req, res, next) {
  // TODO: implement
  res.status(401).json({ success: false, error: 'TODO: implement authenticate' });
}

/**
 * TODO: Implement authorize factory (copy từ bài tập 2)
 */
function authorize(...roles) {
  return (req, res, next) => {
    // TODO: implement
    next();
  };
}

function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    error: `Cannot ${req.method} ${req.path}`,
  });
}

function errorHandler(err, req, res, next) {
  console.error('[ERROR]', err.message);

  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ success: false, error: 'Invalid JSON' });
  }

  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
}

module.exports = { validate, authenticate, authorize, notFoundHandler, errorHandler };
