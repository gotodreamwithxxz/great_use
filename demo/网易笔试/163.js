//'aaaabbbccs'
var line = 'aaaabbbccs';
var sum = 0,
    max = 1,
    cnt = 1;

for (var i = 1; i < line.length; i++) {
    if (line[i] == line[i - 1]) {
        max++;
    } else {
        sum += max;
        cnt++;
        max = 1;
    }
}
sum += max;
var res = Math.round((sum / cnt) * 100) / 100;
console.log(res.toFixed(2));

//魔法币，已知要达到n个！一台机器是2*x+1，第二台2*x+2,输出选取机器的顺序
var n = parseInt(15);
var arr = [];
var m = (n-1)%2;
var num = n;
while (num != 0) {
    if (m==1){
    	arr.push('2');
	} else {
    	arr.push('1');
    }
    num = Math.floor((num-1)/2);
    m = (num-1)%2;
}
console.log(arr.reverse().join(''));

