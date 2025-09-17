const double1 = (x) => x * 2;
console.log(double1(5)); // 10
//Cách khác
function double2(x){
    return x * 2;
}
console.log(double2(5)); // 10
//Cách khác
const double3 = function(x){
    return x * 2;
}
console.log(double3(5)); // 10
//Cách khác
const double4 = x => {
    return x * 2;
}
//Cách khác
const double5 = (x) => x * 2;
console.log(double5(5)); // 10