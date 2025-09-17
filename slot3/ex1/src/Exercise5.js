const people = [
  { name: "Ann", age: 19 },
  { name: "Bob", age: 12 },
  { name: "Tom", age: 15 },
  { name: "Sue", age: 22 },
  { name: "Kim", age: 13 }
];

// Lọc những người tuổi teen (13-19)
const teens = people.filter(p => p.age >= 13 && p.age <= 19)
                   .map(p => `${p.name} (${p.age})`);

// In ra từng dòng
teens.forEach(str => console.log(str));
