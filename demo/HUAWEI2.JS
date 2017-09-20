var line = readline(),
    arr = line.split(" ").sort();
var res = [];
var count = 1;
for (var i = 0; i < arr.length; i++) {
    if (arr[i+1] == arr[i]){
        count++;
    } else{
        res.push([arr[i],count]);
        count = 1;
    } 
}
var str = "";
for(var i = 0;i<res.length;i++){
        str = str + res[i][0] + ' ' + res[i][1] + ' ';
}

console.log(str);
