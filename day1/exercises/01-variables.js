/**
 * Bài 1: Biến & Kiểu dữ liệu
 * Day 1 - JavaScript Cơ bản
 */

// ============================================================
// Bài 1.1: Khai báo biến
// Tạo các biến sau và log kết quả ra console
// ============================================================

// TODO: Khai báo họ tên đầy đủ của bạn (dùng const)
const fullName = 'Dao Quang Tan';
// TODO: Khai báo tuổi (dùng let)
let age = 23;
// TODO: Khai báo có phải lập trình viên không (dùng const, kiểu boolean)
const isProgrammer = true;
// TODO: Khai báo danh sách kỹ năng (dùng const, kiểu array)
const skills = ['HTML', 'CSS', 'JS', 'TS', 'Node.js', 'Vue', 'Nest.js', 'SQL'];

// ============================================================
// Bài 1.2: Template literals
// ============================================================

// TODO: Tạo string mô tả bản thân dùng template literal
// Ví dụ: "Tôi là Nguyen Van A, 22 tuổi, là lập trình viên"
const introduction = `Toi la ${fullName}, ${age} tuoi, developer`;

// ============================================================
// Bài 1.3: Phép toán cơ bản
// ============================================================

// TODO: Khai báo 2 số bất kỳ
const num1 = 10;
const num2 = 13;

// TODO: Tính và log: tổng, hiệu, tích, thương
const sum = num1 + num2;
const sub = num1 - num2;
const mul = num1 * num2;
const div = num1 / num2;
console.log(sum, sub, mul, div);

// TODO: Dùng Math.round(), Math.floor(), Math.ceil() với số thập phân
const round = Math.round(3.3); // lam tron gan nhat
const floor = Math.floor(3.3); // lam tron xuong
const ceil = Math.ceil(3.3); // lam tron len
console.log(round, floor, ceil);

// ============================================================
// Bài 1.4: Kiểm tra kiểu dữ liệu
// ============================================================

// TODO: Viết function checkType(value) nhận vào một giá trị
// Log ra kiểu dữ liệu của giá trị đó
// Xử lý đặc biệt: null phải log "null" (không phải "object")
//                 Array phải log "array" (không phải "object")

function checkType(value) {
  // TODO: implement
  if (value === null) {
    console.log('null');
    return;
  }

  if (Array.isArray(value)) {
    console.log('array');
    return;
  }

  console.log(typeof value);
}

// Test cases (sau khi viết xong, kết quả phải đúng):
// checkType("hello")   -> "string"
// checkType(42)        -> "number"
// checkType(true)      -> "boolean"
// checkType(null)      -> "null"
// checkType(undefined) -> "undefined"
// checkType([1,2,3])   -> "array"
// checkType({a: 1})    -> "object"

checkType('hello');
checkType(42);
checkType(true);
checkType(null);
checkType(undefined);
checkType([1, 2, 3]);
checkType({ a: 1 });
