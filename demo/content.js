//执行上下文
console.log(a);
var a = 100;

fn('zhangsan');
function fn(name) {
    age =20;
    console.log(name, age);
    var age;
}

//this
var b = {
    name : 'A',
    fn: function (){
        console.log(this.name);
    }
}
b.fn(); //this === b
b.fn.call({name: 'B'});   //this === {name: 'B'}
var fn1 = a.fn;
fn1();   //this === window

//场景
/*
 *(1)this作为构造函数执行
 *(2)作为对象属性执行
 *(3)作为普通函数执行
 *(4)apply，call和bind 
 **/
function Foo (name){
    this.name = name;
}
var  f1 = new Foo();

var obj = {
    name: 'A',
    printName: function(){
        console.log(this.name);
    }
}
obj.printName();

function fn2() {
    console.log(this);  //this === window
}
fn2();

function fn3(name, age) {
    alert(name);
    console.log(this);
}
fn3.call({x: 100}, 'zhangsan', 20);  //this就是{x: 100}

var fn4 = function (name, age) {
    alert(name);
    console.log(this);
}.bind({y: 200 });    //bind必须是函数表达式
fn4('zhangsan', 20);

//闭包
/**
 * 1.函数作为返回值
 * 2.函数作为参数传递
 */
function F1(){
    var a = 100;   //父级作用域
    return function(){
        console.log(a);
    }
}
var f1 = F1();
var a = 200;
f1();     //打印出来是100，a此时为自由变量，要从函数定义的父级作用域查找a，即var a = 100；

function F2(fn){
    var a = 300;
    fn();
}
F2(f1);   //打印出来是100 


//实际开发中闭包的应用，用于封装变量，收敛权限
function isFirstLoad(){
    var _list = [];
    return function(id) {
        if (_list.indexOf(id)>=0) {
            return false;
        } else{
            _list.push(id);
            return true;
        }
    }
}
var firstLoad = isFirstLoad();   //_list外部访问不到
firstLoad(10); //true
firstLoad(10); //false
firstLoad(100); //true    