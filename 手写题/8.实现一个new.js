// 实现一个new
function myNew1(Fn){
    let obj = {}
    let arg = [...arguments].slice(1)
    obj.__proto__ = Fn.prototype
    obj.__proto__.constructor = Fn
    let result = Fn.apply(obj, arg)
    return result instanceof Object ? result : obj
}

function myNew() {
    let constr = Array.prototype.shift.call(arguments) // 获取fn
    let obj = Object.create(constr.prototype)
    // 上面约等于下面
    // obj.__proto__ = constr.prototype
    // obj.__proto__.constructor = constr
    let result = constr.apply(obj, arguments)
    return result instanceof Object ? result : obj
}

/**
 * 1.创建一个对象
 * 2.获取
*/
function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function() {
       console.log(this.name)
    }
}

// var person = new Person('Nicholas', 29, 'Front-end developer'); 
var person = myNew(Person, 'Nicholas', 29, 'Front-end developer');

console.log(person.name) // Nicholas
person.sayName();        // Nicholas
console.log(person.__proto__ === Person.prototype);   // true