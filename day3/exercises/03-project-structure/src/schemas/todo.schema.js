const Joi = require("joi");

/**
 * TODO: Định nghĩa các schema cho todo operations
 *
 * createTodoSchema:
 * - title   : string, 1-200 ký tự sau trim, bắt buộc
 * - priority: "low" | "medium" | "high", default "medium"
 *
 * updateTodoSchema:
 * - title    : string, 1-200 ký tự, không bắt buộc
 * - priority : "low" | "medium" | "high", không bắt buộc
 * - completed: boolean, không bắt buộc
 * - ít nhất 1 field (dùng .min(1))
 *
 * todoQuerySchema (validate req.query):
 * - status  : "all" | "active" | "completed", default "all"
 * - priority: "low" | "medium" | "high", không bắt buộc
 * - search  : string, max 100 ký tự, không bắt buộc
 * - sort    : "createdAt" | "priority" | "title", default "createdAt"
 * - order   : "asc" | "desc", default "asc"
 */

const createTodoSchema = Joi.object({
  // TODO: define
});

const updateTodoSchema = Joi.object({
  // TODO: define
}).min(1);

const todoQuerySchema = Joi.object({
  // TODO: define
});

module.exports = { createTodoSchema, updateTodoSchema, todoQuerySchema };
