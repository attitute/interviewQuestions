// 实现一个bind
function myBind(){
    let thatFn = this, // 获取调用bind的函数
    _thatArg = arguments[0] // 获取新this
    // let args = Array.prototype.slice.call(arguments, 1) // 获取bind的后续参数
    let args = [...arguments].slice(1) // 获取参数
    return function () {
        return thatFn.apply(_thatArg, args.concat(Array.prototype.slice.call(arguments)))
    }
}

// 实现一个call
function myCall() {
    let thatFn = this // 获取函数
    let args = [...arguments].slice(1) // 获取参数
    let context = arguments[0]
    context.fn = thatFn
    let result = context.fn(...args)
    delete context.fn
    return result
}