import React from 'react';

export default function Exercise1() {
    // Các functions
    const double1 = (x) => x * 2;

    function sum(...nums) {
        return nums.filter(n => typeof n === 'number' && !isNaN(n)).reduce((a, b) => a + b, 0);
    }

    function avg(...nums) {
        let arr = nums.filter(n => typeof n === 'number' && !isNaN(n));
        return arr.length ? +(arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2) : 0;
    }

    // Test data
    const person = {
        name: "John",
        age: 30,
        address: {
            street: "123 Main St"
        }
    };

    const { address: { street, city = "Unknown City" } } = person;

    const ages = [33, 12, 20, 16];
    const [first, , third = 0, ...restAges] = ages;

    const people = [
        { name: "Ann", age: 19 },
        { name: "Bob", age: 12 },
        { name: "Tom", age: 15 },
        { name: "Sue", age: 22 },
        { name: "Kim", age: 13 }
    ];

    const teens = people.filter(p => p.age >= 13 && p.age <= 19)
                        .map(p => `${p.name} (${p.age})`);

    return (
        <>
            <p>Hello <strong>Exercise 1</strong></p>
            <h2>Chi tiết bài tập 1</h2>
            
            <p>Hàm double(5): {double1(5)}</p>
            
            <p>sum(1,2,3): {sum(1,2,3)}</p>
            <p>sum(1,'x',4): {sum(1,'x',4)}</p>
            <p>avg(1,2,3,4): {avg(1,2,3,4)}</p>
            <p>avg(): {avg()}</p>
            
            <p>street: {street}</p>
            <p>city: {city}</p>
            
            <p>first: {first}</p>
            <p>third: {third}</p>
            <p>restAges: [{restAges.join(', ')}]</p>
            
            <h3>Teenagers:</h3>
            {teens.map((teen, index) => (
                <p key={index}>{teen}</p>
            ))}
        </>
    );
}