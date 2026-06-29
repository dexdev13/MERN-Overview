const notesService = require("../services/notes.service");

/**
 * TODO: Implement getMyNotes
 * GET /api/notes
 * - userId từ req.user.userId (set bởi authenticate middleware)
 * - filter từ req.query (đã validate)
 * - Gọi notesService.getUserNotes(userId, req.query)
 * - Response 200: { success: true, data: notes, total: notes.length }
 */
async function getMyNotes(req, res, next) {
  try {
    // TODO: implement
    res.json({ message: "TODO: implement getMyNotes" });
  } catch (err) {
    next(err);
  }
}

/**
 * TODO: Implement getNoteById
 * GET /api/notes/:id
 * - Gọi notesService.getNoteById(id, req.user.userId)
 * - Response 200: { success: true, data: note }
 * - Nếu note không phải của user -> service throw 403 -> error handler xử lý
 */
async function getNoteById(req, res, next) {
  try {
    // TODO: implement
    res.json({ message: "TODO: implement getNoteById" });
  } catch (err) {
    next(err);
  }
}

/**
 * TODO: Implement createNote
 * POST /api/notes
 * - Gọi notesService.createNote({ userId: req.user.userId, ...req.body })
 * - Response 201: { success: true, data: note, message: "Note created successfully" }
 */
async function createNote(req, res, next) {
  try {
    // TODO: implement
    res.json({ message: "TODO: implement createNote" });
  } catch (err) {
    next(err);
  }
}

/**
 * TODO: Implement updateNote
 * PUT /api/notes/:id
 * - Gọi notesService.updateNote(id, req.body, req.user.userId)
 * - Response 200: { success: true, data: note, message: "Note updated" }
 */
async function updateNote(req, res, next) {
  try {
    // TODO: implement
    res.json({ message: "TODO: implement updateNote" });
  } catch (err) {
    next(err);
  }
}

/**
 * TODO: Implement deleteNote
 * DELETE /api/notes/:id
 * - Gọi notesService.deleteNote(id, req.user.userId)
 * - Response 200: { success: true, message: "Note deleted" }
 */
async function deleteNote(req, res, next) {
  try {
    // TODO: implement
    res.json({ message: "TODO: implement deleteNote" });
  } catch (err) {
    next(err);
  }
}

/**
 * TODO: Implement getAllNotes (admin only)
 * GET /api/admin/notes
 * - Gọi notesService.getAllNotes(req.query)
 * - Response 200: { success: true, data: notes, total: notes.length }
 */
async function getAllNotes(req, res, next) {
  try {
    // TODO: implement
    res.json({ message: "TODO: implement getAllNotes (admin)" });
  } catch (err) {
    next(err);
  }
}

module.exports = { getMyNotes, getNoteById, createNote, updateNote, deleteNote, getAllNotes };
