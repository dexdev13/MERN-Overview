/**
 * Bài tập 2 - JWT Authentication
 * Day 3 - Validation, Authentication & Project Structure
 *
 * Mục tiêu:
 * - Implement register + login với bcrypt + JWT
 * - Viết authenticate middleware đọc Bearer token
 * - Viết authorize middleware kiểm tra role
 * - Phân biệt 401 (chưa auth) vs 403 (không có quyền)
 *
 * Cài đặt: npm install express joi jsonwebtoken bcrypt dotenv
 * Setup: tạo file .env cùng thư mục với nội dung:
 *   JWT_SECRET=day3-super-secret-key
 *   JWT_EXPIRES_IN=1h
 *   PORT=3002
 *
 * Chạy: node index.js
 * Test: xem hướng dẫn cuối file
 */

require('dotenv').config();
const express = require('express');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());

// ============================================================
// In-memory data store
// ============================================================

let users = [];
let nextUserId = 1;

// Seed admin user khi khởi động (để test role authorization)
async function seedAdmin() {
  const hashedPassword = await bcrypt.hash('Admin@123', 10);
  users.push({
    id: nextUserId++,
    name: 'Admin User',
    email: 'admin@example.com',
    password: hashedPassword,
    role: 'admin',
    createdAt: new Date(),
  });
  console.log('Admin seeded: admin@example.com / Admin@123');
}

// ============================================================
// Joi schemas
// ============================================================

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).trim().required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .required()
    .messages({
      'string.pattern.base':
        'Password must contain at least 1 uppercase, 1 lowercase, and 1 number',
    }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().required(),
});

const updateProfileSchema = Joi.object({
  name: Joi.string().min(2).max(50).trim(),
}).min(1); // phải có ít nhất 1 field

// ============================================================
// Validate middleware (copy từ bài 1)
// ============================================================

function validate(schema, source = 'body') {
  return (req, res, next) => {
    // TODO: implement (copy từ bài 1 hoặc viết lại)
    // Nếu chưa làm bài 1, implement ở đây:
    // - schema.validate(req[source], { abortEarly: false, stripUnknown: true })
    // - Lỗi -> 400 { success: false, error: "Validation failed", details: [...] }
    // - OK -> req[source] = value; next()
    const { error, value } = schema.validate(req[source], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: error.details.map((d) => ({
          field: d.path.join('.'),
          message: d.message,
        })),
      });
    }

    req[source] = value;
    next();
  };
}

// ============================================================
// 2.0: Authenticate middleware
// ============================================================

/**
 * TODO 2.0: Implement authenticate middleware
 *
 * - Đọc header: Authorization: Bearer <token>
 * - Nếu không có header hoặc sai format -> 401
 * - Verify token với process.env.JWT_SECRET
 * - Nếu token hết hạn -> 401 "Token expired. Please login again."
 * - Nếu token invalid -> 401 "Invalid token."
 * - Nếu OK -> req.user = decoded payload; next()
 *
 * Gợi ý:
 * const authHeader = req.headers.authorization;
 * if (!authHeader || !authHeader.startsWith("Bearer ")) { ... }
 * const token = authHeader.split(" ")[1];
 * jwt.verify(token, process.env.JWT_SECRET) -> decoded hoặc throw
 */
function authenticate(req, res, next) {
  // TODO: implement
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: 'No token provided',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        error: 'Token expired. Please login again.',
      });
    }

    return res.status(401).json({
      success: false,
      error: 'Invalid token.',
    });
  }
}

// ============================================================
// 2.0: Authorize middleware (factory)
// ============================================================

/**
 * TODO 2.0: Implement authorize factory middleware
 *
 * authorize(...roles) trả về middleware:
 * - authenticate phải chạy TRƯỚC authorize
 * - Nếu req.user.role không nằm trong roles -> 403
 * - Nếu OK -> next()
 *
 * Ví dụ dùng:
 * router.delete("/:id", authenticate, authorize("admin"), handler)
 * router.patch("/status", authenticate, authorize("admin", "moderator"), handler)
 */
function authorize(...roles) {
  return (req, res, next) => {
    // TODO: implement
    // Hint: !roles.includes(req.user.role) -> 403
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: 'Forbidden',
      });
    }

    next();
  };
}

// ============================================================
// 2.1: Auth routes - Register & Login
// ============================================================

/**
 * TODO 2.1: POST /api/auth/register
 *
 * Flow:
 * 1. Validate input với registerSchema
 * 2. Kiểm tra email đã tồn tại -> 409 "Email already registered"
 * 3. Hash password: bcrypt.hash(password, 10)
 * 4. Tạo user object { id, name, email, password: hash, role: "user", createdAt }
 * 5. Push vào users array
 * 6. Trả về 201 với user (KHÔNG bao gồm password)
 *
 * Response 201:
 * { success: true, data: { id, name, email, role, createdAt } }
 *
 * Test:
 * curl -X POST http://localhost:3002/api/auth/register \
 *   -H "Content-Type: application/json" \
 *   -d '{"name":"Alice","email":"alice@example.com","password":"Secret123"}'
 *
 * Test trùng email:
 * curl -X POST http://localhost:3002/api/auth/register \
 *   -H "Content-Type: application/json" \
 *   -d '{"name":"Alice 2","email":"alice@example.com","password":"Secret123"}'
 */
app.post('/api/auth/register', validate(registerSchema), async (req, res, next) => {
  try {
    // TODO: implement
    const { name, email, password } = req.body;

    const existed = users.find((u) => u.email === email);
    if (existed) {
      return res.status(409).json({
        success: false,
        error: 'Email already registered',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: nextUserId++,
      name,
      email,
      password: hashedPassword,
      role: 'user',
      createdAt: new Date(),
    };

    users.push(newUser);

    const { password: _, ...userWithoutPassword } = newUser;

    return res.status(201).json({
      success: true,
      data: userWithoutPassword,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * TODO 2.1: POST /api/auth/login
 *
 * Flow:
 * 1. Validate input với loginSchema
 * 2. Tìm user theo email
 * 3. Nếu không tìm thấy -> 401 "Invalid email or password" (KHÔNG nói rõ email sai)
 * 4. bcrypt.compare(password, user.password)
 * 5. Nếu sai -> 401 "Invalid email or password"
 * 6. jwt.sign({ userId, email, role }, secret, { expiresIn })
 * 7. Trả về 200 với token
 *
 * Response 200:
 * { success: true, data: { token, expiresIn: "1h" } }
 *
 * Test:
 * curl -X POST http://localhost:3002/api/auth/login \
 *   -H "Content-Type: application/json" \
 *   -d '{"email":"alice@example.com","password":"Secret123"}'
 *
 * Test sai password:
 * curl -X POST http://localhost:3002/api/auth/login \
 *   -H "Content-Type: application/json" \
 *   -d '{"email":"alice@example.com","password":"wrong"}'
 */
app.post('/api/auth/login', validate(loginSchema), async (req, res, next) => {
  try {
    // TODO: implement
    const { email, password } = req.body;

    const user = users.find((u) => u.email === email);

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password',
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' },
    );

    return res.status(200).json({
      success: true,
      data: {
        token,
        expiresIn: process.env.JWT_EXPIRES_IN || '1h',
      },
    });
  } catch (err) {
    next(err);
  }
});

// ============================================================
// 2.2: Protected routes - cần token hợp lệ
// ============================================================

/**
 * TODO 2.2: GET /api/users/me
 *
 * Yêu cầu: authenticate middleware
 * - Tìm user trong store theo req.user.userId
 * - Trả về user (không có password)
 *
 * Response 200:
 * { success: true, data: { id, name, email, role, createdAt } }
 *
 * Test (thay <token> bằng token từ login):
 * curl http://localhost:3002/api/users/me \
 *   -H "Authorization: Bearer <token>"
 *
 * Test không có token:
 * curl http://localhost:3002/api/users/me
 *
 * Test token hết hạn (sửa tạm JWT_EXPIRES_IN=1s trong .env, restart server, login lấy token, chờ 2s, gọi lại):
 * curl http://localhost:3002/api/users/me \
 *   -H "Authorization: Bearer <expired_token>"
 */
app.get('/api/users/me', authenticate, async (req, res, next) => {
  try {
    // TODO: implement
    // Hint: tìm user: users.find(u => u.id === req.user.userId)
    // Hint: loại bỏ password: const { password: _, ...userWithoutPassword } = user;
    const user = users.find((u) => u.id === req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    const { password: _, ...userWithoutPassword } = user;

    return res.status(200).json({
      success: true,
      data: userWithoutPassword,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * TODO 2.2: PUT /api/users/me
 *
 * Yêu cầu: authenticate middleware
 * - Validate body với updateProfileSchema
 * - Update name của user hiện tại
 * - Trả về user đã update (không có password)
 *
 * Test:
 * curl -X PUT http://localhost:3002/api/users/me \
 *   -H "Authorization: Bearer <token>" \
 *   -H "Content-Type: application/json" \
 *   -d '{"name":"Alice Updated"}'
 */
app.put('/api/users/me', authenticate, validate(updateProfileSchema), async (req, res, next) => {
  try {
    // TODO: implement
    // Hint: tìm index của user trong array, update name
    const index = users.findIndex((u) => u.id === req.user.userId);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    users[index].name = req.body.name;
    users[index].updatedAt = new Date();

    const { password: _, ...userWithoutPassword } = users[index];

    return res.status(200).json({
      success: true,
      data: userWithoutPassword,
    });
  } catch (err) {
    next(err);
  }
});

// ============================================================
// 2.3: Admin routes - cần role "admin"
// ============================================================

/**
 * TODO 2.3: GET /api/admin/users
 *
 * Yêu cầu: authenticate + authorize("admin")
 * - Trả về tất cả users (không có password)
 * - Thêm trường "totalUsers" vào response
 *
 * Response 200:
 * { success: true, data: [...users without password], totalUsers: N }
 *
 * Test với admin (login bằng admin@example.com / Admin@123):
 * curl http://localhost:3002/api/admin/users \
 *   -H "Authorization: Bearer <admin_token>"
 *
 * Test với user thường (expect 403):
 * curl http://localhost:3002/api/admin/users \
 *   -H "Authorization: Bearer <user_token>"
 */
app.get('/api/admin/users', authenticate, authorize('admin'), (req, res) => {
  // TODO: implement
  // Hint: users.map(({ password: _, ...u }) => u) để loại bỏ password
  const safeUsers = users.map(({ password: _, ...u }) => u);

  return res.status(200).json({
    success: true,
    data: safeUsers,
    totalUsers: safeUsers.length,
  });
});

/**
 * TODO 2.3: DELETE /api/admin/users/:id
 *
 * Yêu cầu: authenticate + authorize("admin")
 * - Admin không thể xóa chính mình
 * - Nếu user không tồn tại -> 404
 * - Xóa user khỏi array
 *
 * Response 200:
 * { success: true, message: "User deleted successfully" }
 *
 * Test (expect 403 nếu dùng user token):
 * curl -X DELETE http://localhost:3002/api/admin/users/2 \
 *   -H "Authorization: Bearer <admin_token>"
 */
app.delete('/api/admin/users/:id', authenticate, authorize('admin'), (req, res) => {
  // TODO: implement
  // Hint: parseInt(req.params.id) để convert sang number
  // Hint: if (id === req.user.userId) -> 400 "Cannot delete yourself"
  const id = parseInt(req.params.id, 10);

  if (Number.isNaN(id)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid user id',
    });
  }

  if (id === req.user.userId) {
    return res.status(400).json({
      success: false,
      error: 'Cannot delete yourself',
    });
  }

  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: 'User not found',
    });
  }

  users.splice(index, 1);

  return res.status(200).json({
    success: true,
    message: 'User deleted successfully',
  });
});

// ============================================================
// 2.4: BONUS - Câu hỏi tư duy (trả lời trong comment)
// ============================================================

/**
 * TODO 2.4 (bonus): Trả lời các câu hỏi sau:
 *
 * Q1: Tại sao khi email không tồn tại VÀ khi password sai, ta đều trả về
 *     cùng một message "Invalid email or password" thay vì phân biệt rõ?
 * A1: Vì trả lời giống nhau sẽ tránh lộ thông tin user/email có tồn tại hay không,
 * giảm rủi ro user enumeration.
 *
 * Q2: Payload của JWT có thể decode bởi bất kỳ ai. Điều đó có nguy hiểm không?
 *     Ta nên và không nên lưu gì trong payload?
 * A2: Payload JWT có thể decode nên không nên lưu thông tin nhạy cảm như password,
 * số thẻ, dữ liệu riêng tư. Chỉ nên lưu dữ liệu cần thiết như userId, email, role.
 *
 * Q3: Nếu user đổi password, token cũ có còn hợp lệ không? Làm sao để vô hiệu hóa nó?
 * A3: Token cũ vẫn còn hợp lệ cho đến khi hết hạn. Muốn vô hiệu hóa ngay thì cần
 * cơ chế blacklist, tokenVersion, hoặc đổi JWT secret / refresh token rotation.
 *
 * Q4: Tại sao token nên có expiry time? 1 giờ có phải lựa chọn tốt không?
 * A4: Token cần expiry để giảm rủi ro nếu bị lộ. 1 giờ là mức phổ biến cho access token,
 * nhưng không phải lúc nào cũng tối ưu; thường kết hợp access token ngắn hạn + refresh token.
 *
 * Q5: Sự khác nhau giữa 401 và 403 trong context này là gì? Cho ví dụ cụ thể.
 * A5: 401 = chưa xác thực hoặc token sai/hết hạn.
 * 403 = đã xác thực rồi nhưng không có quyền.
 */

// ============================================================
// 404 & Error Handler
// ============================================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Cannot ${req.method} ${req.path}`,
  });
});

app.use((err, req, res, next) => {
  console.error('[ERROR]', err.message);

  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ success: false, error: 'Invalid JSON in request body' });
  }

  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// ============================================================
// Start server
// ============================================================

seedAdmin().then(() => {
  app.listen(PORT, () => {
    console.log(`\nAuth Exercise server running on http://localhost:${PORT}`);
    console.log('\n--- Flow test (copy từng bước) ---');
    console.log('\n# Bước 1: Đăng ký user mới');
    console.log(`curl -X POST http://localhost:${PORT}/api/auth/register \\`);
    console.log(`  -H "Content-Type: application/json" \\`);
    console.log(`  -d '{"name":"Alice","email":"alice@example.com","password":"Secret123"}'`);
    console.log('\n# Bước 2: Login để lấy token');
    console.log(`curl -X POST http://localhost:${PORT}/api/auth/login \\`);
    console.log(`  -H "Content-Type: application/json" \\`);
    console.log(`  -d '{"email":"alice@example.com","password":"Secret123"}'`);
    console.log('\n# Bước 3: Dùng token gọi protected route (thay <token>)');
    console.log(`curl http://localhost:${PORT}/api/users/me \\`);
    console.log(`  -H "Authorization: Bearer <token>"`);
    console.log('\n# Bước 4: Login với admin');
    console.log(`curl -X POST http://localhost:${PORT}/api/auth/login \\`);
    console.log(`  -H "Content-Type: application/json" \\`);
    console.log(`  -d '{"email":"admin@example.com","password":"Admin@123"}'`);
    console.log('\n# Bước 5: Admin xem tất cả users (thay <admin_token>)');
    console.log(`curl http://localhost:${PORT}/api/admin/users \\`);
    console.log(`  -H "Authorization: Bearer <admin_token>"`);
    console.log('\n# Bước 6: User thường cố vào admin route (expect 403)');
    console.log(`curl http://localhost:${PORT}/api/admin/users \\`);
    console.log(`  -H "Authorization: Bearer <user_token>"`);
  });
});
