// var a = readline();
// var b = readline();
//编程题1
var a = 'fedcba';
var b = 'ee';
var ArrA = a.split('');
var ArrB = b.split('');
var length = ArrA.length;
ArrB.sort().reverse();
for (var i=0; i<length; i++){
    if (ArrB[0] > ArrA[i] ){
        ArrA[i] = ArrB[0];
        ArrB.shift();
    }
}
var result = ArrA.join('');
console.log(result);

//选择题
Object.prototype.execArr = function () {
    var array = this;
    var n = {}, r = [], len = array.length, val, type;
    for (var i = 0; i < array.length; i++) {
        val = array[i];
        type = typeof val;
        if (!n[val]) { 
            n[val] = [type]; r.push(val) 
        }else if (n[val].indexOf(type) < 0) { 
            n[val].push(type); r.push(val) 
        }
    }
    return r;
}
var obj = [1, 5, 4, 4, 5, 6, 7, 3, 3, 2];
console.log(obj.execArr());

//选择题2
var apple ={
    iphone : function(){
        return this.phoneVersion;
    },
    phoneVersion:7
}
console.log(typeof (app = apple.iphone)());

//选择题3
var mystr = 'i am a student';
var a = mystr.substring(9,13);
console.log(a)