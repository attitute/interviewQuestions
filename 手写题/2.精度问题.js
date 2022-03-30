
function add(num1, num2){
    var p1 = 0
    var p2 = 0
    if (num1.toString().split('.').length > 1){
        p1 = num1.toString().split('.')[1].length
    }

    if (num2.toString().split('.').length > 1){
        p2 = num2.toString().split('.')[1].length
    }

    let p = p1 > p2 ? p1 : p2

    let num = num1 * Math.pow(10, p) + num2 * Math.pow(10, p)
     
    return num/Math.pow(10,p) 
}
console.log(0.1 + 0.2)
console.log(add(0.1, 0.2))