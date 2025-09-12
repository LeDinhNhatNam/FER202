// Tạo mảng số nguyên
let list = [1, 2, 3, 4, 5];

// In ra giá trị double của từng phần tử (dùng for)
for (let i = 0; i < list.length; i++) {
    console.log(list[i] * 2);
}

// Tạo mảng bình phương các phần tử
let squared = [];
for (let i = 0; i < list.length; i++) {
    squared.push(list[i] * list[i]);
}
console.log("Squared:", squared);

// Lọc các phần tử chẵn
let even = [];
for (let i = 0; i < list.length; i++) {
    if (list[i] % 2 === 0) {
        even.push(list[i]);
    }
}
console.log("Even numbers:", even);

// Tạo mảng object people
let people = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 22 }
];

// Tính tổng tuổi (dùng for)
let totalAge = 0;
for (let i = 0; i < people.length; i++) {
    totalAge += people[i].age;
}
console.log("Total age:", totalAge);