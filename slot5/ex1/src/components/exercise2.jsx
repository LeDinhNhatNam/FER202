import React from 'react';

export default function Exercise2() {
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

  const companies2 = [
    { name: "Alpha", category: "Tech", start: 2001, end: 2019 },
    { name: "Beta", category: "Finance", start: 1999, end: 2021 },
    { name: "Gamma", category: "Retail", start: 2005, end: 2018 }
  ];

  // Tạo company0New với start += 1, không làm đổi companies[0]
  const company0New = { ...companies2[0], start: companies2[0].start + 1 };

  // Hàm gộp mảng dùng rest và spread
  function concatAll(...arrays) {
    return [].concat(...arrays);
  }

  const ages = [15, 22, 13, 19, 25, 18, 30, 17];

  const stats = ages.reduce((acc, age) => {
    acc.total += age;
    acc.min = age < acc.min ? age : acc.min;
    acc.max = age > acc.max ? age : acc.max;
    if (age >= 13 && age <= 19) acc.buckets.teen++;
    if (age >= 20) acc.buckets.adult++;
    return acc;
  }, { total: 0, min: Infinity, max: -Infinity, buckets: { teen: 0, adult: 0 } });

  return (
    <>
      <p>Hello <strong>Exercise 2</strong></p>
      <h2>Chi tiết bài tập 2</h2>
      
      <h3>Top 3 công ty kết thúc sớm nhất:</h3>
      {top3.map((company, index) => (
        <p key={index}>{company.name} - {company.end}</p>
      ))}
      
      <h3>Spread Operator Demo:</h3>
      <p>companies2[0]: {JSON.stringify(companies2[0])}</p>
      <p>company0New: {JSON.stringify(company0New)}</p>
      <p>concatAll([1,2],[3],[4,5]): [{concatAll([1,2],[3],[4,5]).join(', ')}]</p>
      
      <h3>Age Statistics:</h3>
      <p>Total: {stats.total}, Min: {stats.min}, Max: {stats.max}</p>
      <p>Buckets: Teen: {stats.buckets.teen}, Adult: {stats.buckets.adult}</p>
    </>
  );
}
