/**
 * Promise的问题，通顺起来，要不然讲起来模糊不清mb
 */

/***********************************************************
 * 为什么会有Promise出现?
 *  1.最主要的一个场景就是ajax请求(解决回调地狱)
 *  2.为了我们的代码更加具有可读性和可维护性，我们需要将数据请求与数据处理明确的区分开来。上面的写法，是完全没有区分开，
 *    当数据变得复杂时，也许我们自己都无法轻松维护自己的代码了。这也是模块化过程中，必须要掌握的一个重要技能，请一定重视。
 */

// 简单的ajax原生实现
var url = 'https://hq.tigerbrokers.com/fundamental/finance_calendar/getType/2017-02-26/2017-06-10';
var result;

var XHR = new XMLHttpRequest();
XHR.open('GET', url, true);
XHR.send();

XHR.onreadystatechange = function () {
    if (XHR.readyState == 4 && XHR.status == 200) {
        result = XHR.response;
        console.log(result);
    }
}
//当出现第三个ajax(甚至更多)仍然依赖上一个请求的时候，我们的代码就变成了一场灾难。这场灾难，往往也被称为回调地狱。
XHR.onreadystatechange = function () {
    if (XHR.readyState == 4 && XHR.status == 200) {
        result = XHR.response;
        console.log(result);
        // 这个xhr请求利用上个xhr请求的结果
        var url2 = 'http:xxx.yyy.com/zzz?ddd=' + result.someParams;
        var XHR2 = new XMLHttpRequest();
        XHR2.open('GET', url, true);
        XHR2.send();
        XHR2.onreadystatechange = function () {
            //...
        }
    }
}

/**
 * Promise对象有三种状态，他们分别是：
 *  pending: 等待中，或者进行中，表示还没有得到结果
 *  resolved(Fulfilled): 已经完成，表示得到了我们想要的结果，可以继续往下执行
 *  rejected: 也表示得到结果，但是由于结果并非我们所愿，因此拒绝执行
 *      这三种状态不受外界影响，而且状态只能从pending改变为resolved或者rejected，并且不可逆。
 *      在Promise对象的构造函数中，将一个函数作为第一个参数。而这个函数，就是用来处理Promise的状态变化。
 *      resolve和reject都为一个函数，他们的作用分别是将状态修改为resolved和rejected。
 * 
 */

function want() {
    console.log('这是你想要执行的代码');
}

function fn(want) {
    console.log('这里表示执行了一大堆各种代码');

    // 返回Promise对象
    return new Promise(function (resolve, reject) {
        if (typeof want == 'function') {
            resolve(want);
        } else {
            reject('TypeError: ' + want + '不是一个函数')
        }
    })
}

fn(want).then(function (want) {
    want();
})

fn('1234').catch(function (err) {
    console.log(err);
})

// 封装一个get请求的方法
var url = 'https://hq.tigerbrokers.com/fundamental/finance_calendar/getType/2017-02-26/2017-06-10';

function getJSON(url) {
    return new Promise(function (resolve, reject) {
        var XHR = new XMLHttpRequest();
        XHR.open('GET', url, true);
        XHR.send();

        XHR.onreadystatechange = function () {
            if (XHR.readyState == 4) {
                if (XHR.status == 200) {
                    try {
                        var response = JSON.parse(XHR.responseText);
                        resolve(response);
                    } catch (e) {
                        reject(e);
                    }
                } else {
                    reject(new Error(XHR.statusText));
                }
            }
        }
    })
}

getJSON(url).then(resp => console.log(resp));

/**
 * promise应用场景
 * 1.有效的将ajax的数据请求和数据处理分别放在不同的模块中进行管理，
 * 这样做的主要目的在于降低后期维护成本，便于管理。模块化开发（封装ajax）
 * 2.图片加载
 * 3.弹窗提示问题，确定是resolve，取消是reject
 *
 */

setTimeout(function () {
    console.log(1)
}, 0);
new Promise(function executor(resolve) {
    console.log(2);
    for (var i = 0; i < 10000; i++) {
        i == 9999 && resolve();
    }
    console.log(3);
}).then(function () {
    console.log(4);
});
console.log(5);
/**
 * 一道考题：
 * 应该考察我 JavaScript 的运行机制的，让我理一下思路。
 * 首先先碰到一个 setTimeout，于是会先设置一个定时，在定时结束后将传递这个函数放到任务队列里面，因此开始肯定不会输出 1 。
 * 然后是一个 Promise，里面的函数是直接执行的，因此应该直接输出 2 3 。
 * 然后，Promise 的 then 应当会放到当前 tick 的最后，但是还是在当前 tick 中。
 * 因此，应当先输出 5，然后再输出 4 。
 * 最后在到下一个 tick，就是 1 。
 *  “2 3 5 4 1”
 * 
 */