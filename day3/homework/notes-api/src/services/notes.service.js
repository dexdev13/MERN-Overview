const store = require("../data/store");

/**
 * TODO: Implement getUserNotes(userId, filter)
 *
 * - Lấy notes của userId (dùng store.notes.getAll({ userId, ...filter }))
 * - Nếu filter.q: lọc notes có title hoặc content chứa q (case-insensitive)
 * - Return array notes
 */
async function getUserNotes(userId, filter = {}) {
  // TODO: implement
  return [];
}

/**
 * TODO: Implement getAllNotes(filter) - dành cho admin
 *
 * - Lấy tất cả notes (không filter theo userId)
 * - Áp dụng filter.tag nếu có
 * - Return array notes
 */
async function getAllNotes(filter = {}) {
  // TODO: implement
  return [];
}

/**
 * TODO: Implement getNoteById(id, requestingUserId)
 *
 * - Tìm note theo id
 * - Nếu không tìm thấy -> throw 404
 * - Nếu note.userId !== requestingUserId -> throw 403 "Not authorized to access this note"
 * - Return note
 *
 * requestingUserId = null có nghĩa là admin, bỏ qua ownership check
 */
async function getNoteById(id, requestingUserId = null) {
  // TODO: implement
  throw new Error("TODO: implement getNoteById");
}

/**
 * TODO: Implement createNote({ userId, title, content, tags })
 *
 * - Gọi store.notes.create(...)
 * - Return note mới
 */
async function createNote({ userId, title, content, tags }) {
  // TODO: implement
  throw new Error("TODO: implement createNote");
}

/**
 * TODO: Implement updateNote(id, data, requestingUserId)
 *
 * - Tìm note, 404 nếu không có
 * - Ownership check: note.userId !== requestingUserId -> 403
 * - Gọi store.notes.update(id, data)
 * - Return note đã update
 */
async function updateNote(id, data, requestingUserId) {
  // TODO: implement
  throw new Error("TODO: implement updateNote");
}

/**
 * TODO: Implement deleteNote(id, requestingUserId)
 *
 * - Tìm note, 404 nếu không có
 * - Ownership check: note.userId !== requestingUserId -> 403
 * - Gọi store.notes.remove(id)
 * - Return true
 */
async function deleteNote(id, requestingUserId) {
  // TODO: implement
  throw new Error("TODO: implement deleteNote");
}

module.exports = {
  getUserNotes,
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
};
