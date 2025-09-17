const companies = [
  { name: "Alpha", category: "Tech", start: 2001, end: 2019 },
  { name: "Beta", category: "Finance", start: 1999, end: 2021 },
  { name: "Gamma", category: "Retail", start: 2005, end: 2018 },
  { name: "Delta", category: "Health", start: 2010, end: 2020 },
  { name: "Epsilon", category: "Tech", start: 2003, end: 2017 }
];

// Tạo bản sao đã sắp xếp theo end tăng dần
const sorted = [...companies].sort((a, b) => a.end - b.end);

// Lấy 3 công ty đầu
const top3 = sorted.slice(0, 3);

// In ra theo định dạng "Company - EndYear"
top3.forEach(c => console.log(`${c.name} - ${c.end}`));
