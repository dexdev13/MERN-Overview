/**
 * Bài 3: Callback, Promise, Async/Await
 * Day 1 - JavaScript Bất đồng bộ
 */

// ============================================================
// Helper functions (đừng sửa phần này)
// ============================================================

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Fake database
const db = {
  users: [
    { id: 1, name: "Alice", teamId: 10 },
    { id: 2, name: "Bob", teamId: 20 },
  ],
  teams: [
    { id: 10, teamName: "Backend", managerId: 100 },
    { id: 20, teamName: "Frontend", managerId: 200 },
  ],
  managers: [
    { id: 100, name: "Charlie", email: "charlie@company.com" },
    { id: 200, name: "Diana", email: "diana@company.com" },
  ],
};

// ============================================================
// Bài 3.1: Chuyển từ callback sang Promise
// ============================================================

// Hàm dùng callback (đừng sửa)
function readFileFake(filename, callback) {
  setTimeout(() => {
    if (filename.endsWith(".txt")) {
      callback(null, `Content of ${filename}`);
    } else {
      callback(new Error("Only .txt files allowed"));
    }
  }, 500);
}

// TODO: Viết hàm readFilePromise(filename) dùng Promise thay vì callback
function readFilePromise(filename) {
  // TODO: wrap readFileFake trong Promise
}

// Test:
// readFilePromise("data.txt").then(content => console.log(content)); // "Content of data.txt"
// readFilePromise("data.json").catch(err => console.error(err.message)); // "Only .txt files allowed"

// ============================================================
// Bài 3.2: Promise chain
// ============================================================

// TODO: Tạo 3 hàm giả lập API (mỗi hàm delay 500ms):
// getUser(id) -> resolve với user object, reject nếu không tìm thấy
function getUser(id) {
  // TODO
}

// getTeam(teamId) -> resolve với team object, reject nếu không tìm thấy
function getTeam(teamId) {
  // TODO
}

// getManager(managerId) -> resolve với manager object, reject nếu không tìm thấy
function getManager(managerId) {
  // TODO
}

// TODO: Dùng Promise chain để lấy thông tin manager của user id=1
// getUser(1)
//   .then(...)
//   .then(...)
//   .then(manager => console.log("Manager:", manager))
//   .catch(...)

// ============================================================
// Bài 3.3: Async/Await với error handling
// ============================================================

// TODO: Viết lại logic Bài 3.2 dùng async/await
// Thêm: nếu id <= 0, throw Error("Invalid user ID")
async function getUserManager(userId) {
  // TODO
}

// Test:
// getUserManager(1).then(m => console.log("Manager of user 1:", m.name));
// getUserManager(-1).catch(e => console.error(e.message)); // "Invalid user ID"
// getUserManager(99).catch(e => console.error(e.message)); // "User not found"

// ============================================================
// Bài 3.4: So sánh tuần tự vs song song
// ============================================================

// TODO: So sánh thời gian:
// a) Gọi getUser(1), getUser(2), getUser(3) tuần tự (await từng cái)
async function fetchSequential() {
  const start = Date.now();
  // TODO: await getUser(1), rồi getUser(2), rồi getUser(3) tuần tự
  const elapsed = Date.now() - start;
  console.log(`Sequential: ${elapsed}ms`); // expect ~1500ms
}

// b) Gọi Promise.all([getUser(1), getUser(2), getUser(3)])
async function fetchParallel() {
  const start = Date.now();
  // TODO: Promise.all với 3 getUser calls
  const elapsed = Date.now() - start;
  console.log(`Parallel: ${elapsed}ms`); // expect ~500ms
}

// Chạy cả 2 và so sánh:
// fetchSequential();
// fetchParallel();
