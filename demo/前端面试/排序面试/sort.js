/**
 * 理解排序算法的不同
 * 
 * n: 数据规模
 * k:“桶”的个数
 * In-place: 占用常数内存，不占用额外内存
 * Out-place: 占用额外内存
 * 稳定性：排序后2个相等键值的顺序和排序之前它们的顺序相同
 * 
 */
var arr = [];
var number = 10000;
while (number--) {
    arr.push(Math.floor(Math.random() * 10000));
}

function print(a) {
    console.log(a);
}
/**
 * 冒泡排序（Bubble Sort）
 */
function bubbleSort(arr) {
    var len = arr.length;
    for (var i = 0; i < len; i++) {      //每循环一次最后一位变为最大值
        for (var j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {        //相邻元素两两对比
                var temp = arr[j + 1];        //元素交换
                arr[j + 1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}


/**
 * 选择排序（Selection Sort）
 */
function selectionSort(arr) {
    var len = arr.length;
    var minIndex, temp;
    for (var i = 0; i < len - 1; i++) {       //每次循环第一个数变为最小值
        minIndex = i;
        for (var j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {     //寻找最小的数
                minIndex = j;                 //将最小数的索引保存
            }
        }
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    return arr;
}

/**
 * 插入排序（Insertion Sort）
 */
function insertionSort(arr) {
    var len = arr.length;
    var preIndex, current;
    for (var i = 1; i < len; i++) {
        preIndex = i - 1;
        current = arr[i];
        while (preIndex >= 0 && arr[preIndex] > current) {
            arr[preIndex + 1] = arr[preIndex];
            preIndex--;
        }
        arr[preIndex + 1] = current;       //不满足条件后，把当前值插入，每次循环前i+1个值已经排好序
    }
    return arr;
}

/**
 * 希尔排序（Shell Sort）
 * 希尔排序是插入排序的一种更高效率的实现。它与插入排序的不同之处在于，它会优先比较距离较远的元素。
 * 希尔排序的核心在于间隔序列的设定。既可以提前设定好间隔序列，也可以动态的定义间隔序列
 */
function shellSort(arr) {
    var len = arr.length,
        temp,
        gap = 1;
    while (gap < len / 3) {          //动态定义间隔序列，每隔gap的数据进行比较
        gap = gap * 3 + 1;
    }
    for (gap; gap > 0; gap = Math.floor(gap / 3)) {   //根据gap循环比较完一次，修改gap的值
        for (var i = gap; i < len; i++) {
            temp = arr[i];
            for (var j = i - gap; j > 0 && arr[j] > temp; j -= gap) {
                arr[j + gap] = arr[j];
            }
            arr[j + gap] = temp;
        }
    }
    return arr;
}

/**
 * 归并排序（Merge Sort）
 * 一种典型的分而治之思想的算法应用，归并排序的实现由两种方法：
 *  自上而下的递归（所有递归的方法都可以用迭代重写，所以就有了第2种方法）
 *  自下而上的迭代（JS推荐使用迭代）
 *  JavaScript当前并没有提供尾递归优化。深度递归的函数可能会因为堆栈溢出而运行失败
 */
function mergeSort(arr) {       //采用自上而下的递归方法
    var len = arr.length;
    if (len < 2) {
        return arr;
    }
    var middle = Math.floor(len / 2),
        left = arr.slice(0, middle),
        right = arr.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    var result = [];
    while (left.length > 0 && right.length > 0) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }
    while (left.length)
        result.push(left.shift());

    while (right.length)
        result.push(right.shift());

    return result;
}

/**
 * 快速排序（Quick Sort）
 * 快速排序的最坏运行情况是O(n²)，比如说顺序数列的快排。但它的平摊期望时间是O(n log n) 
 * 且O(n log n)记号中隐含的常数因子很小，比复杂度稳定等于O(n log n)的归并排序要小很多
 * 所以，对绝大多数顺序性较弱的随机数列而言，快速排序总是优于归并排序。
 */
function quickSort(arr, left, right) {
    var len = arr.length,
        partitionIndex,
        left = typeof left != 'number' ? 0 : left,
        right = typeof right != 'number' ? len - 1 : right;

    if (left < right) {
        partitionIndex = partition(arr, left, right);
        quickSort(arr, left, partitionIndex - 1);
        quickSort(arr, partitionIndex + 1, right);
    }
    return arr;
}

function partition(arr, left, right) {      //分区操作
    var pivot = left,                       //设定基准值（pivot）
        index = pivot + 1;
    for (var i = index; i <= right; i++) {
        if (arr[i] < arr[pivot]) {
            swap(arr, i, index);
            index++;
        }
    }
    swap(arr, pivot, index - 1);
    return index - 1;
}

function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

/**
 * 这个快排性能差
 * @param arr 
 */
function quickSort1(arr) {
    if (arr.length == 0) {
        return [];
    }
    var lesser = [],
        greater = [],
        pivot = arr[0];          //设定基准值（pivot）
    for (var i = 1, len = arr.length; i < len; i++) {
        if (arr[i] < pivot) {
            lesser.push(arr[i]);
        } else {
            greater.push(arr[i]);
        }
    }
    return quickSort1(lesser).concat(pivot, quickSort1(greater));
}
