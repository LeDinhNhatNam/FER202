// Tính tổng các số hợp lệ
function sum(...nums) {
    return nums.filter(n => typeof n === 'number' && !isNaN(n)).reduce((a, b) => a + b, 0);
}

function avg(...nums) {
    let arr = nums.filter(n => typeof n === 'number' && !isNaN(n));
    return arr.length ? +(arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2) : 0;
}

console.log(sum(1,2,3)); // 6
console.log(sum(1,'x',4)); // 5
console.log(avg(1,2,3,4)); // 2.5
console.log(avg()); // 0
