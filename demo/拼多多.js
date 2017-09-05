//实现tree的Linux指令
var n = read_line();

var map = new Map();
while(n--) {
    var str = read_line();
    var arr = str.split(' ');
    map.set( arr[1], arr[0]);    
}

