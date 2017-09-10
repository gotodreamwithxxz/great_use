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
 *  未完成，2017/09/09
 */
