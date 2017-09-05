/**
 * 
 * @author lijiaqi
 * @param vue核心实现
 *  
 * 回答vue的面试
 */

/**
 * 
 * 首先我认为Vue.js是一个提供MVVM数据双向绑定的库，专注于UI层面，核心思想是：数据驱动、组件系统。
 *     （1) 简洁 （2） 轻量 （3）快速 （4） 数据驱动 （5） 模块友好 （6） 组件化
 *      Vue 异步执行 DOM 更新 vue DOM的视图更新实现，使用到了ES6的Promise及HTML5的MutationObserver，
 *      当环境不支持时，使用setTimeout(fn, 0)替代
 * 第一点：数据驱动--回归编程的本质:数据结果+算法
 *      Vue.js数据观测原理在技术实现上，利用的是ES5Object.defineProperty和存储器属性:getter和setter
 *      （所以只兼容IE9及以上版本），可称为基于依赖收集的观测机制。核心是VM，即ViewModel，保证数据和
 *      视图的一致性。
 *      基于依赖收集的观测机制原理：(优点在于可以精确、主动地追踪数据的变化，不需要手动触发或对作用域
 *          中所有watcher都求值，不存在angular脏检查的问题)
 *          1 将原生的数据改造成 “可观察对象”，通常为，调用defineProperty改变data对象中数据为存储器
 *              属性。一个可观察对象可以被取值getter，也可以被赋值setter。
 *          2 在解析模板，也就是在watcher的求值过程中，每一个被取值的可观察对象都会将当前的watcher注
 *              册为自己的一个订阅者，并成为当前watcher的一个依赖。
 *          3 当一个被依赖的可观察对象被赋值时，它会通知notify所有订阅自己的watcher重新求值，并触发
 *              相应的更新，即watcher对象中关联的DOM改变渲染。 
 *      例外：特殊的是，对于数组，需要通过包裹数组的可变方法（比如push）来监听数组的变化。在添加/删除
 *           属性，或是修改数组特定位置元素时，也需要调用特定的函数，如obj.$add(key, value)才能触发
 *           更新。这是受ES5的语言特性所限。
 * 
 * 第二点：组件系统
 *      组件开发是一种朴素的开发思想,分而治之,大型系统拆分成一个个的小模块小组件,分配给不同的人.
 *          额外的好处是顺便能复用这个组件。
 *      1 模板（template）：模板声明了数据和最终展现给用户的DOM之间的映射关系。
 *      2 初始数据（data）：一个组件的初始数据状态。对于可复用的组件来说，这通常是私有的状态。
 *      3 接受的外部参数(props)：组件之间通过参数来进行数据的传递和共享。
 *      4 方法（methods）：对数据的改动操作一般都在组件的方法内进行。
 *      5 生命周期钩子函数（lifecycle hooks）：一个组件会触发多个生命周期钩子函数。
 *      6 私有资源（assets）：Vue.js当中将用户自定义的指令、过滤器、组件等统称为资源。
 *          一个组件可以声明自己的私有资源。私有资源只有该组件和它的子组件可以调用。
 *      1 异步批量DOM更新：当大量数据变动时，所有受到影响的watcher会被推送到一个队列中，并且每个
 *        watcher只会推进队列一次。这个队列会在进程的下一个 tick异步执行。这个机制可以避免同一个
 *        数据多次变动产生的多余DOM操作，也可以保证所有的DOM写操作在一起执行，避免DOM读写切换可能
 *        导致的layout。
 *      2 动画系统：Vue.js提供了简单却强大的动画系统，当一个元素的可见性变化时，用户不仅可以很简单
 *        地定义对应的CSS Transition或Animation效果，还可以利用丰富的JavaScript钩子函数进行更底
 *        层的动画处理。
 *      3 可扩展性：除了自定义指令、过滤器和组件，Vue.js还提供了灵活的mixin机制，让用户可以在多个
 *        组件中复用共同的特性。
 *      
 *      
 *     Vue.js(参见vue.jpg)MVVM  Model(data属性) View(el属性) ViewModel(Vue实例，用于连接View和Model)
 * 
 * 
 */

/**
 * 所有的生命周期钩子自动绑定 this 上下文到实例中，因此你可以访问数据，对属性和方法进行运算。这意味着 
 * 你不能使用箭头函数来定义一个生命周期方法 (例如 created: () => this.fetchTodos())。
 * 这是因为箭头函数绑定了父上下文，因此 this 与你期待的 Vue 实例不同
 * 
 */

// 1.beforeCreate
// 详细：在实例初始化之后，数据观测(data observer) 和 event/ watcher 事件配置之前被调用。
// 2.created
// 详细：实例已经创建完成之后被调用。在这一步，实例已完成以下的配置：数据观测(data observer) ，属性和方法的运算，
//      watch / event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见。
// 3.beforeMount
// 详细：在挂载开始之前被调用：相关的 render 函数首次被调用。该钩子在服务器端渲染期间不被调用。
// 4.mounted
// 详细：el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。如果 root 实例挂载了一个文档内元素，
//      当 mounted 被调用时 vm.$el 也在文档内。
// 注意 mounted 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick 替换掉 mounted：
// mounted: function () {
//     this.$nextTick(function () {
//         // Code that will run only after the entire view has been rendered
//     })
// }
// 该钩子在服务器端渲染期间不被调用。
// 5.beforeUpdate
// 详细：数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。
// 你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。
// 该钩子在服务器端渲染期间不被调用。
// 6.updated
// 详细：由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
// 当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。然而在大多数情况下，你应该避免在此期间更改状态。
// 如果要相应状态改变，通常最好使用计算属性或 watcher 取而代之。
// 注意 updated 不会承诺所有的子组件也都一起被重绘。如果你希望等到整个视图都重绘完毕，可以用 vm.$nextTick 替换掉 updated：
// updated: function () {
//     this.$nextTick(function () {
//         // Code that will run only after the entire view has been re-rendered
//     })
// }
// 该钩子在服务器端渲染期间不被调用。
// 7.activated
// keep - alive 组件激活时调用。该钩子在服务器端渲染期间不被调用。
// 构建组件 - keep - alive
// 动态组件 - keep - alive
// 8.deactivated
// 详细：keep - alive 组件停用时调用。该钩子在服务器端渲染期间不被调用。
// 构建组件 - keep - alive
// 动态组件 - keep - alive
// 9.beforeDestroy
// 详细： 实例销毁之前调用。在这一步，实例仍然完全可用。该钩子在服务器端渲染期间不被调用。
// 10.destroyed
// 详细： Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。
// 该钩子在服务器端渲染期间不被调用。