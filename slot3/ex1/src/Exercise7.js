const companies = [
  { name: "Alpha", category: "Tech", start: 2001, end: 2019 },
  { name: "Beta", category: "Finance", start: 1999, end: 2021 },
  { name: "Gamma", category: "Retail", start: 2005, end: 2018 }
];

// Tạo company0New với start += 1, không làm đổi companies[0]
const company0New = { ...companies[0], start: companies[0].start + 1 };

// Hàm gộp mảng dùng rest và spread
function concatAll(...arrays) {
  return [].concat(...arrays);
}

console.log("companies[0]", companies[0]);
console.log("company0New", company0New);
console.log("concatAll([1,2],[3],[4,5])", concatAll([1,2],[3],[4,5]));
