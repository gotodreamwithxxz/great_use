/**
 * 1.1 create more global var;
 */
function checkName() { }
function checkEmail() { }
function checkPassword() { }

var checkName = function () { }
// equal with the top;

/**
 * 1.2 Use object to have many var(function)
 */
var checkObj = {
    checkName: function () {
    },
    checkEmail: function () {
    },
    checkPassword: function () {
    }
}
//or
var checkObj = function () { }
checkObj.checkName = function () { }

/**
 * 1.3 ture or false object;
 */
var checkObj = function () {
    return {
        checkName: function () {
        },
        checkEmail: function () {
        },
        checkPassword: function () {
        }
    }
}
var a = checkObj();
a.checkName();

/**
 * Use class is ok !
 * 1.to use the new operator
 */
var checkObj = function () {
    this.checkEmail = function () {
    }
    this.checkName = function () {
    }
    this.checkPassword = function () {
    }
}
var b = new checkObj();
b.checkName();

/**
 * Use class is ok !
 * 1.to use prototype 
 */
var checkObj = function () { };
checkObj.prototype.checkName = function () {
}
//or
checkObj.prototype = {
    checkEmail : function(){

    }
}

var c = new checkObj();
c.checkEmail();

//use link method;
var checkObj = {
    checkName : function(){
        return this;
    },
    checkEmail : function(){
        return this;
    },
    checkPassword : function(){
        return this;
    }
}
checkObj.checkName().checkEmail();

var checkObj = function () { };
checkObj.prototype = {
    checkEmail : function(){
        return this;
    },
    checkName : function(){
        return this;
    },
    checkPassword : function(){
        return this;
    }
}
var d = new checkObj();
d.checkEmail().checkName();