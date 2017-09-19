//1.原型模式对象 //son属性值是引用类型，会造成一个实例改变，另外一个也跟着改变
function Person() {
}
Person.prototype.name = "lijiaqi";
Person.prototype.age = 24;
Person.prototype.son = [1, 2, 3];
Person.prototype.sayName = function () {
    return this.name;
};
var person1 = new Person();
var person2 = new Person();
console.log(person1.constructor === Person);  //true
person1.name = 'hello';         //实例属性　//若发生delete
delete person1.name;            //可以通过hasOwnProperty()判断是否为来自实例属性
console.log(person1.name)       //lijiaqi －－来自原型

//2.更简单的原型模式对象 //缺点constructor变为Object //son属性值是引用类型，会造成一个实例改变，另外一个也跟着改变
function Dog() {
}
Dog.prototype = {
    name: "xiaohua",
    age: 4,
    son: ["haha", "gaga", "lala"],
    sayName: function () {
        return this.name;
    }
};
var dog1 = new Dog();
console.log(dog1.constructor === Dog);      //false
console.log(dog1.constructor === Object);   //true

//3.修正constructor简单的原型对象  //son属性值是引用类型，会造成一个实例改变，另外一个也跟着改变
function Dog1() {
}
Dog1.prototype = {
    name: "xiaohua",
    age: 4,
    son: ["haha", "gaga", "lala"],
    sayName: function () {
        return this.name;
    }
};
Object.defineProperty(Dog1.prototype, "constructor", {
    enumerable: false,  //不可枚举
    value: Dog1
});
var dog2 = new Dog1();
console.log(dog2.constructor === Dog1);   //true
/********************************************************************************************************/

//4.组合使用构造函数与原型模式   //son属性值是引用类型，解决问题
//每个实例都有自己的一份实例属性的副本，但同时又共享着方法的引用
function Cat() {
    this.name = "xiaomao";
    this.age = 6;
    this.son = ["maoyi", "maoer", "maosan"];
}
Cat.prototype = {
    sayName: function () {
        return this.name;
    }
};
var cat1 = new Cat();
var cat2 = new Cat();
cat1.son.push("maosi");
console.log(cat1.son === cat2.son); //false
console.log(cat2);

//5.寄生的构造函数模式/工厂模式(缺点：不能依赖instanceof来确认对象类型)
function Jisheng(name, age, job) {
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.son = ['dage', 'erge', 'sanmei'];
    o.sayName = function () {
        return this.name;
    };
    return o;
}
var jisheng = new Jisheng("jish", 55, "teacher");
console.log(jisheng instanceof Jisheng);    //false
console.log(typeof jisheng);   //Object
console.log(jisheng.sayName());   //jish

//6.稳妥的构造函数模式（与寄生的构造函数模式相似，俩点不同：1.对象实例方法不引用this。2.不使用new操作符调用构造函数）
function Wentuo(name, age, job) {
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function () {
        return name;  //不引用this
    };
    return o;
}
var wentuo = Wentuo("went", 45, "doctor");
console.log(wentuo.sayName());    //went

//ES6 class
class People {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    toString() {
        console.log(this.name);
    }
    toValue() {
        console.log(this.age);
    }
}