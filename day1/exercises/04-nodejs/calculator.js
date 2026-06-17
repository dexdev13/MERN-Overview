/**
 * Bài 4.2: CommonJS Module
 * Tạo calculator module và export các hàm
 */

// TODO: Viết các hàm sau và export chúng

// add(a, b) - cộng hai số
// subtract(a, b) - trừ hai số
// multiply(a, b) - nhân hai số
// divide(a, b) - chia hai số, throw Error("Cannot divide by zero") nếu b === 0

// Export tất cả dùng module.exports

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
  if (b === 0) {
    throw Error('Cannot divide by zero');
  }
  return a / b;
};

// Test:
console.log(add(10, 3)); // 13
console.log(subtract(10, 3)); // 7
console.log(multiply(10, 3)); // 30
console.log(divide(10, 2)); // 5

module.exports = { add, subtract, multiply, divide };
