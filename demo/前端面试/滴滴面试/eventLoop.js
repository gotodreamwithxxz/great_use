/**
 *  多线程不仅占用多倍的系统资源，也闲置多倍的资源，这显然不合理。Event Loop就是为了解决这个问题而提出的
 *  JavaScript的一大特点就是单线程，而这个线程中拥有唯一的一个事件循环。
 *  Event Loop 事件循环机制从整体上的告诉了我们所写的JavaScript代码的执行顺序
 *  它从script(整体代码)开始第一次循环。之后全局上下文进入函数调用栈。直到调用栈清空(只剩全局)，然后执行所有的micro-task。
 *  当所有可执行的micro-task执行完毕之后。循环再次从macro-task开始，找到其中一个任务队列执行完毕，然后再执行所有的micro-task，
 *  这样一直循环下去。其中每一个任务的执行，无论是macro-task还是micro-task，都是借助函数调用栈来完成。
 * 
 *  将setTimeout()的第二个参数设为0，就表示当前代码执行完（执行栈清空）以后，立即执行（0毫秒间隔）指定的回调函数
 *  注意的是，setTimeout()只是将事件插入了"任务队列"，必须等到当前代码（执行栈）执行完，主线程才会去执行它指定的回调函数。
 *  要是当前代码耗时很长，有可能要等很久，所以并没有办法保证，回调函数一定会在setTimeout()指定的时间执行。
 */

//大的demo
console.log('golb1');

setTimeout(function () {
    console.log('timeout1');
    process.nextTick(function () {
        console.log('timeout1_nextTick');
    })
    new Promise(function (resolve) {
        console.log('timeout1_promise');
        resolve();
    }).then(function () {
        console.log('timeout1_then')
    })
})

setImmediate(function () {
    console.log('immediate1');
    process.nextTick(function () {
        console.log('immediate1_nextTick');
    })
    new Promise(function (resolve) {
        console.log('immediate1_promise');
        resolve();
    }).then(function () {
        console.log('immediate1_then')
    })
})

process.nextTick(function () {
    console.log('glob1_nextTick');
})
new Promise(function (resolve) {
    console.log('glob1_promise');//promise中函数是立即执行的
    resolve();
}).then(function () {
    console.log('glob1_then')
})

setTimeout(function () {
    console.log('timeout2');
    process.nextTick(function () {
        console.log('timeout2_nextTick');
    })
    new Promise(function (resolve) {
        console.log('timeout2_promise');
        resolve();
    }).then(function () {
        console.log('timeout2_then')
    })
})

process.nextTick(function () {
    console.log('glob2_nextTick');
})
new Promise(function (resolve) {
    console.log('glob2_promise');
    resolve();
}).then(function () {
    console.log('glob2_then')
})

setImmediate(function () {
    console.log('immediate2');
    process.nextTick(function () {
        console.log('immediate2_nextTick');
    })
    new Promise(function (resolve) {
        console.log('immediate2_promise');
        resolve();
    }).then(function () {
        console.log('immediate2_then')
    })
})

// ->->->out result:
// golb1
// glob1_promise
// glob2_promise
// glob1_nextTick
// glob2_nextTick
// glob1_then
// glob2_then
// timeout1
// timeout1_promise
// timeout2
// timeout2_promise
// timeout1_nextTick
// timeout2_nextTick
// timeout1_then
// timeout2_then
// immediate1
// immediate1_promise
// immediate2
// immediate2_promise
// immediate1_nextTick
// immediate2_nextTick
// immediate1_then
// immediate2_then