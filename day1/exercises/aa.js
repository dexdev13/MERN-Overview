// const users = [
//   { id: 1, name: 'Dex', age: 22, role: 'dev' },
//   { id: 2, name: 'An', age: 25, role: 'designer' },
//   { id: 3, name: 'Minh', age: 17, role: 'intern' },
//   { id: 4, name: 'Hoa', age: 30, role: 'dev' },
// ];

// // Lấy TÊN của các DEV trên 18 tuổi
// const adultDevNames = users
//   .filter(user => user.age >= 18)  // Lọc trên 18
//   .filter(user => user.role === "dev") // Lọc dev
//   .map(user => user.name);  // Lấy tên

// // Kết quả: ["Dex", "Hoa"]

// console.log(adultDevNames);


const numbers = [2, 4, 6, 8, 10];

// 1. forEach: Chỉ in ra, không trả về gì
numbers.forEach(num => console.log(num * 2)); 

// 2. map: Trả về mảng mới nhân đôi giá trị
const doubled = numbers.map(num => num * 2); // [2, 4, 6, 8, 10]

// 3. filter: Trả về mảng chứa các số chẵn
const evens = numbers.filter(num => num % 2 === 0); // [2, 4]

// 4. find: Tìm số đầu tiên lớn hơn 3
const found = numbers.find(num => num > 3); // 4

// 5. some & every
const hasNegative = numbers.some(num => num < 0); // false (không có số âm)
const allPositive = numbers.every(num => num > 0); // true (tất cả đều dương)

// 6. reduce: Tính tổng (0 là giá trị khởi tạo của accumulator)
const total = numbers.reduce((accumulator, current) => accumulator + current, 0); // 15