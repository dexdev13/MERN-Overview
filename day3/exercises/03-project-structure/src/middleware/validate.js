/**
 * TODO: Copy validate middleware từ bài 1 (hoặc viết lại)
 *
 * validate(schema, source = "body") -> middleware
 * - Validate req[source]
 * - Lỗi -> 400 với details
 * - OK -> req[source] = sanitized; next()
 */
function validate(schema, source = 'body') {
  return (req, res, next) => {
    // TODO: implement
    next();
  };
}

module.exports = validate;
