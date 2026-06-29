/**
 * Controller layer cho todos
 *
 * Quy tắc:
 * - Controller CHỈ: nhận req, gọi service, trả res
 * - Không có business logic (if/else về data) ở đây
 * - Mọi lỗi đều dùng next(err) -> errorHandler xử lý
 * - Controller không biết gì về cách lưu data
 */

const todosService = require('../services/todos.service');

/**
 * TODO: Implement getAll
 * GET /api/todos
 * - Lấy filter từ req.query (đã validate bởi middleware)
 * - Gọi todosService.getAllTodos(req.query)
 * - Response 200: { success: true, data: todos, total: todos.length }
 */
async function getAll(req, res, next) {
  try {
    // TODO: implement
    res.json({ message: 'TODO: implement getAll controller' });
  } catch (err) {
    next(err);
  }
}

/**
 * TODO: Implement getById
 * GET /api/todos/:id
 * - Gọi todosService.getTodoById(req.params.id)
 * - Response 200: { success: true, data: todo }
 */
async function getById(req, res, next) {
  try {
    // TODO: implement
    res.json({ message: 'TODO: implement getById controller' });
  } catch (err) {
    next(err);
  }
}

/**
 * TODO: Implement create
 * POST /api/todos
 * - Gọi todosService.createTodo(req.body)
 * - Response 201: { success: true, data: todo, message: "Todo created successfully" }
 */
async function create(req, res, next) {
  try {
    // TODO: implement
    res.json({ message: 'TODO: implement create controller' });
  } catch (err) {
    next(err);
  }
}

/**
 * TODO: Implement update
 * PATCH /api/todos/:id
 * - Gọi todosService.updateTodo(req.params.id, req.body)
 * - Response 200: { success: true, data: todo, message: "Todo updated" }
 */
async function update(req, res, next) {
  try {
    // TODO: implement
    res.json({ message: 'TODO: implement update controller' });
  } catch (err) {
    next(err);
  }
}

/**
 * TODO: Implement toggleComplete
 * PATCH /api/todos/:id/complete
 * - Gọi todosService.toggleComplete(req.params.id)
 * - Response 200: { success: true, data: todo, message: <từ service> }
 */
async function toggleComplete(req, res, next) {
  try {
    // TODO: implement
    res.json({ message: 'TODO: implement toggleComplete controller' });
  } catch (err) {
    next(err);
  }
}

/**
 * TODO: Implement remove
 * DELETE /api/todos/:id
 * - Gọi todosService.deleteTodo(req.params.id)
 * - Response 200: { success: true, message: "Todo deleted successfully" }
 */
async function remove(req, res, next) {
  try {
    // TODO: implement
    res.json({ message: 'TODO: implement remove controller' });
  } catch (err) {
    next(err);
  }
}

module.exports = { getAll, getById, create, update, toggleComplete, remove };
