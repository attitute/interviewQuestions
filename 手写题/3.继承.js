// 1. 原型继承
    // 1、新实例无法向父类构造函数传参。
    // 2、继承单一。
    // 3、所有新实例都会共享父类实例的属性。
    // （原型上的属性是共享的，一个实例修改了原型属性，另一个实例的原型属性也会被修改！）

// 2. 构造函数继承
    // 1、只能继承父类构造函数的属性。
    // 2、无法实现构造函数的复用。（每次用每次都要重新调用）
    // 3、每个新实例都有父类构造函数的副本，臃肿。

// 3. 组合继承
    // 1、调用了两次父类构造函数（耗内存），子类的构造函数会代替原型上的那个父类构造函数。

// 4. 原型式继承
    // 1、所有实例都会继承原型上的属性。
    // 2、无法实现复用。（新实例属性都是后面添加的）

// 5. 寄生式继承
    // 1、没用到原型，无法复用。

// 6. 寄生组合式继承（无缺 常用）


// 寄生组合式继承

function Person(name) {
    this.name = name
    this.sum = function(){
        console.log(this.name)
    }
}
Person.prototype.age = 10

// 寄生 继承父类原型
function content(obj){
    function f(){}
    f.prototype = obj
    return new f()
}
// 组合 继承父类构造函数属性
function Sub(){
    Person.call(this)
}
var con = content(Person.prototype)

Sub.prototype = con // 继承了con的实例
con.constructor = Sub // 修复实例指向

var sub1 = new Sub() // Sub的实例 继承了父类的原型 构造函数属性 
console.log(sub1.age)
