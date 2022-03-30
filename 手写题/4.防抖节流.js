/**
 * @desc 函数防抖
 * @param {Function} func 回调函数
 * @param {Number} delay 防抖时间
 * @param {Object} options {
 * leading: true, // 是否在延迟之前调用
 * context: null, // 上下文
 * }
 */
 function debounce(func, delay = 17, options = { leading: true, context: null }) {
    let timer;
    const _debounce = function(...args) {
        if (timer) {
            clearTimeout(timer);
        }
        if (options.leading && !timer) {
            timer = setTimeout(null, delay);
            func.apply(options.context, args);
        } else {
            timer = setTimeout(() => {
                func.apply(options.context, args);
                timer = null;
            }, delay);
        }
    };
    _debounce.cancel = function() {
        clearTimeout(timer);
        timer = null;
    };
    return _debounce;
}
/**
 * @desc 函数节流
 * @param {Function} func 回调函数
 * @param {Number} delay 节流时间
 * @param {Object} options {
 * leading: true, // 是否在延迟之前调用
 * trailing: false, //指定是否在超时后调用
 * context: null, // 上下文
 * }
 */
function throttle(func, delay, options = { leading: true, trailing: false, context: null }) {
    let previous = new Date(0).getTime();
    let timer = null;
    const _throttle = function(...args) {
        let now = new Date().getTime();
        if (!options.leading) {
            if (timer) return;
            timer = setTimeout(() => {
                timer = null;
                func.apply(options.context, args);
            }, delay);
        } else if (now - previous > delay) {
            func.apply(options.context, args);
            previous = now;
        } else if (options.trailing) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(options.context, args);
            }, delay);
        }
    };
    _throttle.cancel = () => {
        previous = 0;
        clearTimeout(timer);
        timer = null;
    };
    return _throttle;
}