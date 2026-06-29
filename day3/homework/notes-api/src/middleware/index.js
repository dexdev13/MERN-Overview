const jwt = require('jsonwebtoken');

/**
 * TODO: Implement validate middleware (copy từ bài tập 1)
 */
function validate(schema, source = 'body') {
  return (req, res, next) => {
    // TODO: implement
    const { error, value } = schema.validate(req[source], { abortEarly: false });
    if (error) {
      const err = new Error(error.details.map((d) => d.message).join(', '));
      err.statusCode = 400;
      return next(err);
    }
    req[source] = value;
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
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'No token provided' });
  }
  const token = authHeader.slice(7);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Invalid or expired token' });
  }
}

/**
 * TODO: Implement authorize factory (copy từ bài tập 2)
 */
function authorize(...roles) {
  return (req, res, next) => {
    // TODO: implement
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, error: 'Forbidden' });
    }
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
