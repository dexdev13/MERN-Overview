/**
 * Data layer - In-memory store cho todos
 * Đây là nơi DUY NHẤT đọc/ghi dữ liệu
 * Service gọi store, không ai khác được trực tiếp thao tác mảng todos
 */

let todos = [];
let nextId = 1;

const getAll = (filter = {}) => {
  let result = [...todos];

  // TODO: implement filter logic
  // - filter.status: "all" | "active" | "completed"
  // - filter.priority: "low" | "medium" | "high"
  // - filter.search: tìm trong title (case-insensitive)

  return result;
};

const getById = (id) => {
  // TODO: implement - trả về todo hoặc null
  return null;
};

const create = (data) => {
  // TODO: implement
  // data gồm: { title, priority }
  // tự thêm: id, completed: false, createdAt: new Date()
  // push vào todos, return todo mới
  return null;
};

const update = (id, data) => {
  // TODO: implement
  // - Tìm index theo id
  // - Nếu không tìm thấy -> return null
  // - Merge data vào todo hiện tại (chỉ update field có trong data)
  // - Thêm updatedAt: new Date()
  // - Return todo đã update
  return null;
};

const remove = (id) => {
  // TODO: implement
  // - Tìm index theo id
  // - Nếu không tìm thấy -> return false
  // - splice khỏi mảng
  // - Return true
  return false;
};

module.exports = { getAll, getById, create, update, remove };
