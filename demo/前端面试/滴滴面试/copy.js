/**
 * 滴滴一面
 */

/**
 * 问题：
 * 1：浅拷贝与深拷贝
 * 2：promise为何出现，如何介绍promise
 * 3：Vue钩子函数，生命周期要熟悉
 * 4：项目介绍要流畅，突出自己如何解决问题的，按照STAR法则
 */

/**
 * 
 * 1.对象的浅拷贝和深拷贝
 * 浅复制只会将对象的各个属性进行依次复制，并不会进行递归复制，而JavaScript 存储对象都是存地址的，
 *      所以浅复制会导致 obj.arr 和 shallowObj.arr 指向同一块内存地址
 * 深复制则是开辟新的栈，两个对象对应两个不同的地址，修改一个对象的属性，不会改变另一个对象的属性
 * important  对于字符串类型，浅复制是对值的复制，对于对象来说，浅复制是对对象地址的复制
 * 
 */

/************************************************************************** */
var Chinese = {
    nation: '中国',

}
function shallowCopy(p) {  //浅拷贝
    var c = {};
    for (var i in p) {
        if (p.hasOwnProperty(i)) {
            c[i] = p[i];
        }
    }
    return c;
}
Chinese.arr = [1, 2]
var Doctor = shallowCopy(Chinese)
Doctor.cancer = '医生'    //Chinese对象arr属性push新元素，但是影响到Doctor
Chinese.arr.push(500)
console.log(Doctor)

/**************************************************************************** */
//(1):深复制，要想达到深复制就需要用递归
function deepCopy(o, c) {
    var c = c || {};
    for (var i in o) {
        if (typeof o[i] === 'object') {            //要考虑深复制问题了
            o[i].constructor === Array?c[i] = []:c[i] = {};
            deepCopy(o[i], c[i])
        } else {
            c[i] = o[i]
        }
    }
    return c
}
//demo
var china = {
    nation: '中国',
    birthplaces: ['北京', '上海', '广州'],
    skincolr: 'yellow',
    friends: ['sk', 'ls']
}
var result = { name: 'result' }
result = deepCopy(china, result)
china.birthplaces.push('太谷');
console.dir(result)
console.dir(china)

//(2):深复制，通过JSON解析解决
var test = {
    name: {
        xing: {
            first: '张',
            second: '李'
        },
        ming: '老头'
    },
    age: 40,
    friend: ['隔壁老王', '宋经纪', '同事']
}
var result = JSON.parse(JSON.stringify(test))
result.age = 30
result.name.xing.first = '往'
result.friend.push('fdagldf;ghad')
console.dir(test)
console.dir(result)

