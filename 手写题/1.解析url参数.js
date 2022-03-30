// 正则 
// function GetQueryString(url, name){
//      var reg = new RegExp("(^|[?|&])"+ name +"=([^&]*)($|&)");
//      var r = url.substr(1).match(reg);
//      console.log(r,'32')
//      if (r != null) return unescape(r[2]);
//     return null;
// }

function GetQueryString(url, name){
    var reg = new RegExp("(^|[?|&])"+ name +"=([^&]*)($|&)");
    var params = url.match(reg)
    if (params != null) return params[2]
        return null;
}
 
var url = 'https://lanhuapp.com/web/#/item/project/detailDetach?pid=16f1a82c-29c7-4152-89a0-874488397730&project_id=16f1a82c-29c7-4152-89a0-874488397730&image_id=dce16320-7ff5-4bbd-8c12-b0032e57579e&teamId=000bed07-f763-43d5-9991-4993a55919ea'
// console.log(GetQueryString(url, 'image_id'))
console.log(GetQueryString(url, 'project_id'))
// console.log(GetQueryString(url, 'pid'))

// 方法2 使用js提供的方法
var params = new URLSearchParams('?'+url.split('?')[1])
console.log(params.get('pid'))

