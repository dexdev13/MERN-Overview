const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const store = require("../data/store");

/**
 * TODO: Implement register({ name, email, password })
 *
 * Flow:
 * 1. Kiểm tra email đã tồn tại -> throw 409
 * 2. Hash password (saltRounds = 10)
 * 3. Tạo user qua store.users.create(...)
 * 4. Return user (không có password)
 */
async function register({ name, email, password }) {
  // TODO: implement
  throw new Error("TODO: implement register");
}

/**
 * TODO: Implement login({ email, password })
 *
 * Flow:
 * 1. Tìm user theo email (không tìm thấy -> 401 "Invalid email or password")
 * 2. bcrypt.compare(password, user.password) (sai -> 401 cùng message)
 * 3. jwt.sign({ userId, email, role }, secret, { expiresIn })
 * 4. Return { token, expiresIn: "1h" }
 *
 * QUAN TRỌNG: Dùng cùng 1 message cho cả 2 trường hợp sai
 * để tránh user enumeration attack
 */
async function login({ email, password }) {
  // TODO: implement
  throw new Error("TODO: implement login");
}

module.exports = { register, login };
