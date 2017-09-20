var a = readline();
var b = readline();
var ArrA = a.split('-').reverse();
var ArrB = b.split('-').reverse();

var len = Math.min(ArrA.length, ArrB.length);
var sum = 0;
var result = '';
for (var i = 0; i < len; i++) {
    if (ArrA[i] == ArrB[i]) {
        sum++;
        result = ArrA[i];
    }
}

if (sum == 0) {
    sum = 0;
    result = 0;
} else {
    sum--;
}

console.log(result + ' ' + sum);