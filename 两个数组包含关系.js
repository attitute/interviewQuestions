var A = [1,3,5]
var B = [9,1,4,2]

// A包含B=>1 B包含A=>2 A等于B=>0 其它=>-1

function judge(A,B) {
    let result = A.length === B.length ? 0 : A.length > B.length ? 1 : 2
    let map = {}
    if (A.length < B.length){
        let temp = A
        A = B
        B = temp
    }
    for (const item of A) {
        if  (map[item]){
            map[item]++
        } else {
            map[item] = 1
        }
    }
    for (const item of B) {
        if (!map[item]) {
            return -1
        }else {
            map[item]--
        }
    }
    return result
}

console.log(judge([1,2,4],[1,2,4])) // 0
console.log(judge([1,2,4,3],[1,2,4])) // 1
console.log(judge([1,2,4],[1,2,4,3])) // 2
console.log(judge([1,1,3,5],[1,5,3])) // 1
console.log(judge([1,1,3,2,4],[1,2,4,4,2,3,1])) // 2
