/**
 * Array.filter
 * Array filters items based on search criteria (query)
 */
const fruits = ['apple', 'banana', 'grapes', 'mango', 'orange'];
const filterItems = (query, array) => {
    return array.filter((el, index, array) =>
        el.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
}

console.log(filterItems('ap', fruits)); // ['apple', 'grapes']
console.log(filterItems('an', fruits)); // ['banana', 'mango', 'orange']

/**'
 * Array.forEach
 */
var words = ['one', 'two', 'three', 'four'];
words.forEach(function (word, index, array) {
    console.log(word);
    if (word === 'two') {
        words.shift();      //['two', 'three', 'four']
    }
    console.log(index, array);
});
//output is ->  one two four


/**
 * Array.reduce
 */
var flattened = [[0, 1], [2, 3], [4, 5]].reduce(
    function (a, b, index, array) {
        return a.concat(b);
    },
    []  //初始值a
);

/**
 *  Array.map
 */
var result = ['1', '2', '3'].map(function (item, index) {
    return item * 2;
})
console.log(result); //->  [2,4,6]

//['1','2','3'].map(parseInt)问题解析?
//结果是[1,NaN,NaN]
/**
 * 实际上是这样调用的：第二参数index
 * parseInt('1',0,theArray);
 * parseInt('2',1,theArray);
 * parseInt('3',2,theArray);
 * 所以出现以上结果 ->  parseInt第二参数，为非0且小于2，函数都不会查询字符串直接返回NaN
 */