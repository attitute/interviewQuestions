obj = {
    _aq: '_q_a1se+112312',
    _bq_q: 2
}


function camel (data) {
    if (typeof data != 'object') return data
    let newData = {}
    for (const key in data) {
        let newkey = key.replace(/_([a-z])/g, (p, m) =>{
            console.log(p,m)
            return m.toUpperCase()
        } )
        let newValue = data[key]
        if (typeof data[key] === 'string') {
            newValue = newValue.replace(/_([a-z])/g,(x,y)=>y.toUpperCase())
        }
        newData[newkey] = newValue
    }
    return newData
}

console.log(camel(obj))
console.log(camel(1))


// 驼峰转下划线

obj1 = {
    Aq: '_q_a1se+112312',
    QqaAk: 2
}

function underline (data) {
    if (typeof data != 'object') return data
    let newData = {}
    for (const key in data) {
        let newkey = key.replace(/([A-Z])/g, (p, m) =>{
            console.log(p,m)
            return `_${m.toLowerCase()}`
        } )
        let newValue = data[key]
        if (typeof data[key] === 'string') {
            newValue = newValue.replace(/([A-Z])/g, (p, m) =>{
                console.log(p,m)
                return `_${m.toLowerCase()}`
            })
        }
        newData[newkey] = newValue
    }
    return newData
}

console.log(underline(obj1))