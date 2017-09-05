var EventEmitter = require('events').EventEmitter;

var life = new EventEmitter(); 
life.setMaxListeners(15);   //绑定的响应事件数量最大默认10个

function kiss1(who){
    console.log('give ' + who + ' kiss1 !');
}
//addEventListener or on
life.on('askKiss', kiss1)
life.on('askKiss', function(who){
    console.log('give ' + who + ' kiss2 !');
})
life.on('askKiss', function(who){
    console.log('give ' + who + ' kiss3 !');
})
life.on('askKiss', function(who){
    console.log('give ' + who + ' kiss4 !');
})
life.on('askKiss', function(who){
    console.log('give ' + who + ' kiss5 !');
})
life.on('askKiss', function(who){
    console.log('give ' + who + ' kiss6 !');
})
life.on('askKiss', function(who){
    console.log('give ' + who + ' kiss7 !');
})
life.on('askKiss', function(who){
    console.log('give ' + who + ' kiss8 !');
})
life.on('askKiss', function(who){
    console.log('give ' + who + ' kiss9 !');
})
life.on('askKiss', function(who){
    console.log('give ' + who + ' kiss10 !');
})
life.on('askKiss', function(who){
    console.log('give ' + who + ' kiss11 !');
})
//askClothes,没有emit也不会执行
life.on('askClothes', function(who){
    console.log('give ' + who + ' clothes !');
})
life.on('askClothes', function(who){
    console.log('give ' + who + ' cash !');
})

//移除事件
life.removeListener('askKiss', kiss1);
life.removeAllListeners('askClothes');  //移除全部askClothes事件


var hasKiss = life.emit('askKiss', 'lijiaqi');        //true
var hasClothes = life.emit('askClothes', 'xxz');      //true
var hasPlay = life.emit('askPlay', 'lijiaqi and xxz');//false

//监听askKiss的数量
console.log(life.listeners('askKiss').length);
console.log(EventEmitter.listenerCount(life , 'askKiss'));
