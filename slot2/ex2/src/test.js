// Tạo mảng số nguyên
let list = [1, 2, 3, 4, 5];

// Lặp qua mảng, in ra giá trị double của từng phần tử
list.map(n => console.log(n * 2));

// Tạo mảng mới với bình phương các phần tử
let squared = list.map(n => n * n);
console.log("Squared:", squared);

// Lọc các phần tử chẵn
let even = list.filter(n => n % 2 === 0);
console.log("Even numbers:", even);

// Tạo mảng object people
let people = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 22 }
];

// Dùng reduce để tính tổng tuổi
let totalAge = people.reduce((sum, person) => sum + person.age, 0);
console.log("Total age:", totalAge);