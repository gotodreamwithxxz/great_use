//1.原型链继承
//问题1.引用类型的属性被所有实例共享  
//问题2.在创建 Child 的实例时，不能向Parent传参
function Parent() {            //构造函数与原型组合创建类
    this.name = 'kevin';
    this.son = ['mike', 'john'];
}
Parent.prototype.getName = function () {
    console.log(this.name);
}

function Child() {
}

Child.prototype = new Parent();   //继承
Child.prototype.newMethod = function () {
    console.log(this.son);
}

var child1 = new Child();

console.log(child1.newMethod())    // ['mike','john']
child1.son.push('xiaoh');
var child2 = new Child();
console.log(child2.son);         // ["mike", "john", "xiaoh"]



//2.借用构造函数(经典继承)
//优点 1.避免了引用类型的属性被所有实例共享
//2.可以在 Child 中向 Parent 传参
//缺点：方法都在构造函数中定义，每次创建实例都会创建一遍方法。
function Parent(age) {
    this.age = age;
    this.names = ['kevin', 'daisy'];
}

function Child() {
    Parent.call(this, 20);            //继承,传参
}

var child1 = new Child();
child1.names.push('yayu');

console.log(child1.names); // ["kevin", "daisy", "yayu"]
var child2 = new Child();
console.log(child2.names); // ["kevin", "daisy"]



//3.组合继承，原型链继承和借用构造函数继承双剑合璧。
//优点：融合原型链继承和构造函数的优点，是 JavaScript 中最常用的继承模式。
//最大的缺点是会调用两次父构造函数。
function Parent(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}

Parent.prototype.getName = function () {
    console.log(this.name)
}

function Child(name, age) {
    Parent.call(this, name);     //借用构造函数2
    this.age = age;
}

Child.prototype = new Parent(); //原型链1

var child1 = new Child('kevin', '18');
child1.colors.push('black');

console.log(child1.name); // kevin
console.log(child1.age); // 18
console.log(child1.colors); // ["red", "blue", "green", "black"]

var child2 = new Child('daisy', '20');

console.log(child2.name); // daisy
console.log(child2.age); // 20
console.log(child2.colors); // ["red", "blue", "green"]


//4.原型式继承 -> 就是 ES5 Object.create 的模拟实现，将传入的对象作为创建的对象的原型。
//缺点：包含引用类型的属性值始终都会共享相应的值，这点跟原型链继承一样。
function createObj(o) {
    function F() { }
    F.prototype = o;
    return new F();
}

var person = {
    name: 'kevin',
    friends: ['daisy', 'kelly']
}
var person1 = createObj(person);
var person2 = createObj(person);

person1.name = 'person1';
console.log(person2.name); // kevin

person1.firends.push('taylor');
console.log(person2.friends); // ["daisy", "kelly", "taylor"]
//注意：修改person1.name的值，person2.name的值并未发生改变，并不是因为person1和person2有独立的 name 值，
//而是因为person1.name = 'person1'，给person1添加了 name 值，并非修改了原型上的 name 值。


//5.寄生式继承
//创建一个仅用于封装继承过程的函数，该函数在内部以某种形式来做增强对象，最后返回对象。
//缺点：跟借用构造函数模式一样，每次创建对象都会创建一遍方法。
function createObj(o) {
    var clone = Object.create(o);
    clone.sayName = function () {
        console.log('hi');
    }
    return clone;
}


//6.寄生式组合继承
//我们不使用 Child.prototype = new Parent() ，而是间接的让 Child.prototype 访问到 Parent.prototype 
function Parent(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}

Parent.prototype.getName = function () {
    console.log(this.name)
}

function Child(name, age) {
    Parent.call(this, name);     //借用构造函数2
    this.age = age;
}

function prototype(child, parent) {
    var prototype = Object.create(parent.prototype); //创建对象
    prototype.constructor = child;                   //增强对象
    child.prototype = prototype;                     //指定对象
}
prototype(Child, Parent);

var child1 = new Child('kevin', '18');
console.log(child1.getName());


//ES6实现
class Parent {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    toString() {
        return this.x + ' ' + this.y; 
    }
}
class Child extends Parent {
    constructor(x, y, colors) {
        super(x, y); // 调用父类的constructor(x, y)
        this.colors = colors;
    }
    toString() {
        return this.colors + ' ' + super.toString(); // 调用父类的toString()
    }
}