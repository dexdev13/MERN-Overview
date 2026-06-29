/**
 * In-memory store cho users và notes
 *
 * TODO: Implement tất cả các hàm dưới đây
 * Đây là tầng data duy nhất - service không được tự thao tác với arrays
 */

let users = [];
let nextUserId = 1;

let notes = [];
let nextNoteId = 1;

// ---- Users ----

const users_findByEmail = (email) => {
  // TODO: trả về user có email tương ứng, hoặc undefined
  return undefined;
};

const users_findById = (id) => {
  // TODO: trả về user có id tương ứng, hoặc undefined
  return undefined;
};

const users_create = ({ name, email, hashedPassword, role = 'user' }) => {
  // TODO: tạo user mới, push vào array, return user (bao gồm password hash)
  return null;
};

const users_update = (id, data) => {
  // TODO: update user theo id, return user đã update hoặc null
  return null;
};

const users_getAll = () => {
  // TODO: return tất cả users
  return [];
};

const users_remove = (id) => {
  // TODO: xóa user theo id, return true/false
  return false;
};

// ---- Notes ----

const notes_getAll = (filter = {}) => {
  // TODO: return notes theo filter
  // filter có thể có: userId (chỉ lấy notes của user đó), tag (lọc theo tag)
  return [];
};

const notes_findById = (id) => {
  // TODO: trả về note hoặc undefined
  return undefined;
};

const notes_create = ({ userId, title, content, tags = [] }) => {
  // TODO: tạo note mới với: id, userId, title, content, tags, createdAt, updatedAt
  return null;
};

const notes_update = (id, data) => {
  // TODO: update note, set updatedAt: new Date(), return note đã update hoặc null
  return null;
};

const notes_remove = (id) => {
  // TODO: xóa note, return true/false
  return false;
};

// Seed admin khi import lần đầu (gọi từ app startup)
const seedAdmin = async () => {
  const bcrypt = require('bcrypt');
  const hashedPassword = await bcrypt.hash('Admin@123', 10);
  const admin = users_create({
    name: 'Admin',
    email: 'admin@example.com',
    hashedPassword,
    role: 'admin',
  });
  console.log(`Admin seeded: admin@example.com / Admin@123 (id: ${admin?.id})`);
};

module.exports = {
  users: {
    findByEmail: users_findByEmail,
    findById: users_findById,
    create: users_create,
    update: users_update,
    getAll: users_getAll,
    remove: users_remove,
  },
  notes: {
    getAll: notes_getAll,
    findById: notes_findById,
    create: notes_create,
    update: notes_update,
    remove: notes_remove,
  },
  seedAdmin,
};
