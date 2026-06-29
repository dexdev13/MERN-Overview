const Joi = require('joi');

/**
 * TODO: Định nghĩa tất cả schemas
 */

// Auth
const registerSchema = Joi.object({
  // TODO: name (2-50), email, password (min 8, có uppercase + số)
});

const loginSchema = Joi.object({
  // TODO: email, password
});

// Notes
const createNoteSchema = Joi.object({
  // TODO:
  // - title  : string, 1-200 ký tự, bắt buộc
  // - content: string, max 10000 ký tự, không bắt buộc, default ""
  // - tags   : array of string, mỗi tag max 30 ký tự, không bắt buộc, default []
});

const updateNoteSchema = Joi.object({
  // TODO: giống createNoteSchema nhưng không bắt buộc, phải có ít nhất 1 field
}).min(1);

const noteQuerySchema = Joi.object({
  // TODO:
  // - tag: string, không bắt buộc (lọc theo tag)
  // - q  : string, max 100 ký tự, không bắt buộc (full-text search)
});

module.exports = {
  registerSchema,
  loginSchema,
  createNoteSchema,
  updateNoteSchema,
  noteQuerySchema,
};
