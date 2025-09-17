const person = {
    name: "John",
    age: 30,
    address: {
        street: "123 Main St"
        // city có thể không tồn tại
    }
};

// Dùng destructuring để lấy street và city (city mặc định là "Unknown City" nếu không có)
const { address: { street, city = "Unknown City" } } = person;

console.log("street:", street); // 123 Main St
console.log("city:", city);     // Unknown City