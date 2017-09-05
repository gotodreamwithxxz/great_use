//异步
console.log(1);
setTimeout(function() {
    console.log(2);
}, 0);                  
console.log(3);
setTimeout(function() {
    console.log(4);
}, 1000);
console.log(5);
//1,3,5,2,4

//同步
console.log(1);
alert(2);    //造成阻塞
console.log(3);
