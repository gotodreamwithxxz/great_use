/**
一面（1小时）
1.自我介绍。
   --------提前准备下
2.问项目，问实习。
   --------简历重新准备一下
3.indexDB，cookie,localStorage,sessionStorage区别。
    1.数据大小 -> Cookie的大小是受限的，并且每次你请求一个新的页面的时候Cookie都会被发送过去，这样无形中浪费了带宽，
           另外cookie还需要指定作用域，不可以跨域调用。
    2.数据有效时长  -> cookie只在设置cookie过期时间前有效，sessionStorage在当前窗口关闭前有效，localStorage始终有效，除非人为删除
    3.易用性  ->  web Storage都具有相同的操作方法，例如setItem、getItem和removeItem等,cookie需要自己封装
    4.服务器通信  -> Cookie也是不可以或缺的：Cookie的作用是与服务器进行交互，作为HTTP规范的一部分而存在 ，
           而Web Storage仅仅是为了在本地“存储”数据而生（浏览器多标签页通信）
    indexDB本地存储

4.浏览器缓存机制。就是HTTP相关字段的解释。
    * web缓存分为很多种，比如数据库缓存、代理服务器缓存、CDN缓存，浏览器缓存。
    * 一个优秀的缓存策略可以缩短网页请求资源的距离，减少延迟，并且由于缓存文件可以重复利用，还可以减少带宽，降低网络负荷
    * 
    * Web 缓存大家都会觉得很简单，不就是检查资源是否有缓存，如果有就加以利用。
    * 如果追究下去，多数人还能扯出 cache-control,  expires, last-modified, ETag 之类的名词.
    * 缓存不是浏览器本身能够完成的事情，因为在没有服务器端的其他信息的情况下浏览器是无法判断一个资源是否过期的
    * 
    * 针对缓存的控制需要浏览器和服务器端协同完成，所以他们需要一个传递的信息的方式，事实上目前的 Web 缓存主要通过 Headers 来传递信息
    *      1.Cache-Control:（http1.1）最简单的缓存控制策略，即浏览器通过最大生存时间来判断资源的缓存是否有效(cache-control: max-age=93312000)
    *      2.Expires:指定的时间之前浏览器都可以认为缓存是有效的.
    *      PS -> 当两个字段同时存在时，expires 会被 cache-control 覆盖。服务器告诉浏览器缓存仍然有效的方法，那便是 304 Not Modified
    *      3.ETag（http1.1实体标签） 来判断缓存是否有效,服务器端会在 response headers 中返回 ETag（文件的 hash）
    *        If-None-Match:当资源改变时 ETag 也会发生改变。浏览器在发起请求时在 If-None-Match字段携带缓存的 ETag：
    *          服务器接到请求后如果一致（即资源没有修改），则返回 304 Not Modified，否则返回新的资源（200）。
    *      4.Last-Modified/If-Modified-Since:可以通过上次修改时间，服务器端返回资源时通过 Last-Modified 携带资源修改时间，
    *          浏览器通过 If-Modified-Since 携带缓存中的资源的修改时间。
    *          缺点：它是精确到秒的，如果一秒中资源多次服务器不会感知到缓存失效，但这不是一个常见的需求。
    *      
    *  到底使用哪个比较好，还是相辅相成？？？（配置ETag或者移除ETag）
    *      不推荐使用 ETag，原因有几点
    *          Last-Modified 的缺点基本可以忽略不计
    *          ETag 本身需要消耗 CPU，而它的优先级比 Last-Modified 高，当它存在时服务器无论 Last-Modified 是否存在都会使用它判断，
    *          ETag 在分布式系统中生成的值可能不一样，会导致缓存失效
    *      Etag 主要为了解决 Last-Modified 无法解决的一些问题：
    *      1、一些文件也许会周期性的更改，但是他的内容并不改变(仅仅改变的修改时间)，这个时候我们并不希望客户端认为这个文件被修改了，而重新GET；
    *      2、某些文件修改非常频繁，比如在秒以下的时间内进行修改，(比方说1s内修改了N次)，If-Modified-Since能检查到的粒度是s级的，这种修改无法判断(或者说UNIX记录MTIME只能精确到秒)；
    *      3、某些服务器不能精确的得到文件的最后修改时间。

6.js合并后与合并前哪个快，也就是一个<script>标签与两个情况下，哪个更快。
    第一反应合并后，说合并后减少http请求，后边反应过来说不一定，（合并之后只要一个脚本发生变化，就要重新下载，不利于缓存）
    看script位置，如果在head里优先于css与dom加载了的话，会阻塞影响的，同时还说了浏览器引擎渲染过程这些分析了，
    然后面试官说只考虑理想情况，都是正常些都在Body底部，那个快？我坚持的认为合并后快，但面试官说http是同步多线程的，所以多个请求。
    然后提到了defer延迟，被问除了defer还有什么，说了async异步，被问区别。
    1.defer是按照加载顺序执行脚本的，与defer不同的是，标记为async的脚本并不保证按照它们的先后顺序执行。

7.HTTP请求报文结构，当年腾讯实习生招聘问我这个没答好，回去看了HTTP权威指南，所以说了一部分后.
    追问真实HTTP是怎么区分各个字段的，我说换行，那冒号呢？这个不懂了。
    1，请求行
    由3部分组成，分别为：请求方法、URL（见备注1）以及协议版本，之间由空格分隔
    请求方法包括GET、HEAD、PUT、POST、TRACE、OPTIONS、DELETE以及扩展方法，当然并不是所有的服务器都实现了所有的方法，部分方法即便支持，处于安全性的考虑也是不可用的
    协议版本的格式为：HTTP/主版本号.次版本号，常用的有HTTP/1.0和HTTP/1.1
    2，请求头部
    请求头部为请求报文添加了一些附加信息，由“名/值”对组成，每行一对，名和值之间使用冒号分隔
    3，请求正文
    可选部分，比如GET请求就没有请求正文

    1，状态行
    由3部分组成，分别为：协议版本，状态码，状态码描述，之间由空格分隔
    2，响应头部
    与请求头部类似，为响应报文添加了一些附加信息
    3，响应正文


8.事件委托的原理，冒泡与捕获概念以及API。
    事件委托原理：事件冒泡机制
        第一、委托的事件是以冒泡的形式向外传播的所以只要点击div的子元素都会触发委托的事件 
        第二、当事件传播到被委托元素(这里指div)的时候会首先判断e.type和e.target这两个属性.
    优点：1.可以大量节省内存占用，减少事件注册。比如ul上代理所有li的click事件就很不错。
         2.可以实现当新增子对象时，无需再对其进行事件绑定，对于动态内容部分尤为合适
    缺点：事件代理的常用应用应该仅限于上述需求，如果把所有事件都用事件代理，可能会出现事件误判。即本不该被触发的事件被绑定上了事件。
    事件冒泡：事件按照从最特定的事件目标到最不特定的事件目标(document对象)的顺序触发。
    事件捕获：事件先由最上一级的节点先接收事件，然后向下传播到具体的节点。


9.手写代码，封装一个事件处理函数???
//处理兼容性,封装使用
var eventUtil = {  
    // 添加句柄  
    addHandler: function(element, type, handler) {  
        if (element.addEventListener) {  
            element.addEventListener(type, handler, false);  
        } else if (element.attachEvent) {  
            element.attachEvent('on' + type, handler);  
        } else {  
            element['on' + type] = handler;  
        }  
    },  
    // 删除句柄  
    removeHandler: function(element, type, handler) {  
        if (element.removeEventListener) {  
            element.removeEventListener(type, handler, false);  
        } else if (element.detachEvent) {  
            element.detachEvent('on' + type, handler);  
        } else {  
            element['on' + type] = null;  
        }  
    },  
    //获取事件  
    getEvent: function(event) {  
        return event ? event : window.event;  
    },  
    //获取事件类型  
    getType: function(event) {  
        return event.type;  
    },  
    //获取事件源  
    getElement: function(event) {  
        return event.target || event.srcElement;  
    },  
    //阻止默认事件比如a链接跳转  
    preventDefault: function(event) {  
        if (event.preventDefault) {  
            event.preventDefault();  
        } else {  
            event.returnValue = false;  
        }  
    },  
    //阻止事件冒泡  
    stopPropagation: function(event) {  
        if (event.stopPropagation) {  
            event.stopPropagation();  
        } else {  
            event.cancelBubble = true;  
        }  
    }  
} 

10.点击input事件传播的全过程，除了focus,blur,click想不起来了。
    所有浏览器中，当用户通过鼠标操作触发 click 事件时，事件触发顺序: 
    1、MouseDown 事件 
    2、Focus 事件 
    3、MouseUp 事件 
    4、Click 事件 
11.简单定位问题，修改后的定位，思考几秒后没想出来（其实很简单），然后面试官问你是不是CSS不好，我说是的不擅长CSS。

12.CSS画三角形。
    .box {
        border-width:50px;
        border-style:solid;
        border-color:transparent transparent transparent red; 
    } 
13.box-sizing。
    w3c标准：content-box
    ie标准 ：border-box
    继承   ：inherit
14.z-index，追问了何时生效？
    z-index 属性设置元素的堆叠顺序。拥有更高堆叠顺序的元素总是会处于堆叠顺序较低的元素的前面。
    z-index 仅能在定位元素上奏效（position属性值为 relative 或 absolute 或 fixed的对象）
    如果两个元素都没有定位发生位置重合现象或者两个都已定位元素且z-index相同发生位置重合现象，那么按文档流顺序，后面的覆盖前面的。
15.看过那些前端书籍。听完面试官说你一本css都没看过，怪不得css不好。
    JavaScript高级程序设计、HTML5权威指南、数据结构与算法JavaScript描述、
    md我也是没看过css书籍
16.面试结束，有没有问题问。我问网易智能与感知中心做什么工作，期间聊到了对人工智能，VR、AR的认知。
    面试官建议学好JS基础同时也适当注重下CSS，找本书看看。
    总体一面表现挺一般，很多本来会的知识没有答全，加上问了比较多我不擅长的CSS。
    面试官人很好，事件传播问题不停引导我，但确实那块看过太久又没有写过，真的记不起来算是最大的失误，
    其他基本都是追问后才有不会的，当然自己烂的要死的CSS估计也是减分不少。但最后还是给我过了，网易基本都会过面试。

二面（30分钟）
1.自我介绍。
    -------
2.项目介绍。
    -------
3.SEO。第一次遇上问SEO，大概说了一些SEO基础后，聊到SPA的SEO怎么优化.
    页面描述：每个网页都应有一个不超过 150 个字符且能准确反映网页内容的描述标签，文档
    <meta name="description" content="不超过150个字符" /> <!-- 页面描述 -->
    页面关键词
    <meta name="keywords" content=""/> <!-- 页面关键词 -->
    定义页面标题
    <title>标题</title>
    定义网页作者
    <meta name="author" content="name, email@gmail.com" /> <!-- 网页作者 -->
    定义网页搜索引擎索引方式，robotterms是一组使用英文逗号「,」分割的值，
    通常有如下几种取值：none，noindex，nofollow，all，index和follow。文档
    <meta name="robots" content="index,follow" /> <!-- 搜索引擎抓取 -->

4.前端跨域，从同源机制聊到六种跨域方法基本全了。提了CSRF与XSS没讲细节。
    ------必看
    

5.又问了一次浏览器缓存机制。比第一次说的全了一些。

6.谈谈前端工程化理解，答得挺全的
    遗憾忘记提ES6，其实我倒是希望被问ES6的问题，前段时间一直写ES6除了个别不常见api外，ES6很熟悉了。
    总结一下前端工程化的具体内容：
    1.代码规范: 保证团队所有成员以同样的规范开发代码。
    2.分支管理: 不同的开发人员开发不同的功能或组件，按照统一的流程合并到主干。
    3.模块管理: 一方面，团队引用的模块应该是规范的;另一方面，必须保证这些模块可以正确的加入到最终编译好的包文件中。
    4.自动化测试：为了保证和并进主干的代码达到质量标准，必须有测试，而且测试应该是自动化的，可以回归的。
    5.构建：主干更新以后，自动将代码编译为最终的目标格式，并且准备好各种静态资源，
    6.部署。 将构建好的代码部署到生产环境。

9.啥时候学前端的，怎么学的。

10.解释下原型链，两句话说完我感觉说的有点少，然后重说了一次还是两句话。

11.有没有问题要问。我表示惊讶的说这么快。
    然后问了部门用技术栈，用的工具，邮件事业部前端的业务。后来面试官还给出建议，说我知道的已经很全面，但表述上存在问题，首先声音太小虽然我听的懂，
    此外说的太快中间不停顿，无法get重点，建议增加下表述条理性。面试官姐姐还问有没有来过杭州，晚上可以去看看西湖。
    然后面试官介绍说他们用自己开发的regular框架，自己开发的打包工具，所以未来会参与造轮子的工作。

二面面试官是个前端姐姐，人挺好比较亲切，追问比较少，因此问题全答上了，也可能是我一面已经大概知道水平就不再追问，问些了我擅长的好了解水平吧。


一面
1.HTML的doctype的作用？
    DOCTYPE标签是一种标准通用标记语言的文档类型声明
    它的目的是指示 web 浏览器处理的是HTML文档和页面使用哪个 HTML 版本进行编写的指令。
2.DOM和BOM的区别？
    （1）DOM（文档对象模型）是 HTML 和 XML 的应用程序接口（API）。为了能以编程的方法操作这个 HTML 的内容（比如添加某些元素、修改元素的内容、删除某些元素），
        我们把这个 HTML 看做一个对象树（DOM树），它本身和里面的所有东西比如 <div></div> 这些标签都看做一个对象
        BOM 主要处理浏览器窗口和框架，不过通常浏览器特定的 JavaScript 扩展都被看做 BOM 的一部分。为了控制浏览器的行为而出现的接口。
        浏览器可以做什么呢？比如跳转到另一个页面、前进、后退等等，程序还可能需要获取屏幕的大小之类的参数。
    （2）DOM 是为了操作文档出现的 API，document 是其的一个对象；
        BOM 是为了操作浏览器出现的 API，window 是其的一个对象      
        DOM操作的是HTML中的元素，BOM是浏览器的API、操作的是浏览器（即控制浏览器行为）
3.手写一个DOM树
4.了解哪些HTML5的新特性

5.CSS的盒模型是什么
    文档中的每个元素被描绘为矩形盒子。渲染引擎的目的就是判定大小，属性。盒模型属性有：   
    margin：外边距   padding：内边距     border：边框   content：内容
    （W3C和IE）
6.了解margin-collapse吗？
        盒模型中垂直方向上的Margin会在相遇时发生崩塌，也就是说当某个元素的margin-bottom与另一个元素的margin-top相邻时，只有二者中的较大值会被保留下来
    怎么避免margin-collapse？
        根据BFC布局规则 Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠
    　　我们可以在其中一个元素外面包裹一层容器，并触发该容器生成一个BFC。那么两个P便不属于同一个BFC，就不会发生margin重叠。
    了解清除浮动？
        为达到清除内部浮动，我们可以触发par生成BFC，那么parent在计算高度时，parent内部的浮动元素child也会参与计算。
　　      代码：  
        (1).parent { overflow: hidden; } 
        (2)
7.对BFC的了解--BFC全称Block Formatting Context ，直译“块级格式化上下文”，
    布局规则：
        1.内部的Box会在垂直方向，一个接一个地放置。
        2.Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠
        3.每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
        4.BFC的区域不会与float box重叠。
        5.BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
        6.计算BFC的高度时，浮动元素也参与计算
    怎么产生BFC?
        根元素
        float属性不为none
        position为absolute或fixed
        display为inline-block, table-cell, table-caption, flex, inline-flex
        overflow不为visible

8.判断伪类和伪元素?
    伪类和伪元素的根本区别在于：它们是否创造了新的元素(抽象)。
        如果需要添加新元素加以标识的，就是伪元素       ----::first-letter,::before,::after,::first-line,::selection
        反之，如果只需要在既有元素上添加类别的，就是伪类----:link,:visited,:hover,:active,:first-child,:nth-child(),:not()等等
    伪类与伪元素的特性及其区别????
        伪类本质上是为了弥补常规CSS选择器的不足，以便获取到更多信息；
        伪元素本质上是创建了一个有内容的虚拟容器；
        CSS3中伪类和伪元素的语法不同；
        可以同时使用多个伪类，而只能同时使用一个伪元素；
9.浏览器的JS线程运行机制（事件循环队列Event loop）
10.写一个正则表达式匹配，要求匹配netease开头，163结尾,中间可以是任意符号
            /^netease(\w)*163$/.test('netease163')  
12.对响应式设计的理解（设计理念，多种技术综合体）
    响应式网页设计就是一个网站能够兼容多个终端-而不是为每个终端做一个特定的版本，针对任意设备对网页内容进行完美布局的一种显示机制。
    打个比方来说：现在社会有很多响应产品，例如折叠沙发，折叠床等等，当我们需要把沙发放到一个角落的时候，此刻沙发就好比div吧，而角落里的某个地方就好比父元素
    由于父元素空间的改变，我们不得不调整div,让它能够依然放在角落里。在项目中你会遇到不同的终端，由于终端分辨率不同，所以你要想让用户体验更好，
    就必要让你的页面能够兼容多个终端。
    优点：[1] 
        减少工作量（网站，设计，代码，内容都只需要一份，多出的工作量只是js和css的改动）节省时间
        面对不同分辨率设备灵活性强，能够快捷解决多设备显示适应问题
    缺点：[1] 
        兼容各种设备工作量大，效率低下，
        加载更多的样式和脚本，代码累赘，会出现隐藏无用的元素，加载时间加长
        设计比较难精准定位和控制，其实响应式这是一种折中性质的设计解决方案，多方面因素影响而达不到最佳效果
        一定程度上改变了网站原有的布局结构，会出现用户混淆的情况
13.响应式设计的关键是什么？
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    媒体查询、弹性图片、弹性网格布局(百分比布局)例如bootstrap
        1.响应式布局
            1.meta标签定义
            2.使用Media Queries适配对应样式
        2.响应式内容
            1.响应式图片，多媒体video  
14.移动端的页面相对于PC端的页面有什么额外的设置?
    <meta name ="viewport" content ="initial-scale=1, maximum-scale=3, minimum-scale=1, user-scalable=no"> 
    了解移动端web开发和PC端web开发的特点区别在哪儿？就影响前端的两个最大的特点就是——
        1）网络特点：PC端带宽高，网络连接相对稳定；而移动端带宽低，网络不稳定，间歇性连通。
        2）分辨率：PC端分辨率相对固定（1440*900）；而移动端不同手机品牌甚至同一品牌手机不同型号，分辨率差别都很大。

15.媒体查询可以查询哪些属性
    @media
        媒体类型：all  print  screen  speech 
        媒体属性： width	        定义输出设备中的页面可见区域宽度。
                  height	    定义输出设备中的页面可见区域高度。
                  device-height	定义输出设备的屏幕可见高度。
                  device-width	定义输出设备的屏幕可见宽度。
                  orientation	定义输出设备中的页面可见区域高度是否大于或等于宽度。
                  aspect-ratio	定义输出设备中的页面可见区域宽度与高度的比率
                  device-aspect-ratio	定义输出设备的屏幕可见宽度与高度的比率。
                  resolution	定义设备的分辨率。如：96dpi, 300dpi, 118dpcm
                  color	        定义输出设备每一组彩色原件的个数。如果不是彩色设备，则值等于0
                  可添加前缀min或者max
        width与device-width
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
            
16.Promise和传统的异步调用有什么区别
    为什么会有Promise出现?
 *  1.Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。
 *  2.最主要的一个场景就是ajax请求(Promise用于解决回调地狱)
 *  3.为了我们的代码更加具有可读性和可维护性，我们需要将数据请求与数据处理明确的区分开来。
 *      传统的写法是完全没有区分开，当数据变得复杂时，也许我们自己都无法轻松维护自己的代码了。
 *      这也是模块化过程中，必须要掌握的一个重要技能，请一定重视。
 * 
 *  它由社区最早提出和实现，ES6 将其写进了语言标准，统一了用法，原生提供了Promise对象。
 *  所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。
 *  从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。
 *
 *

    关于框架的？Vue
    React的虚拟DOM是什么？
    虚拟DOM的虚拟体现在哪？
    diff算法如何实现

二面
1.为什么要学前端？
2.2048小游戏的响应式设计是怎么实现的
3.写一个左侧固定右侧自适应的布局（这里我用到了之前在网上看到的float+padding方法，面试官表示他居然没看过这个方法。。。）
4.写一个函数每隔5秒调用它自身，总共调用100次，要求可以自定义调用次数和延时时间。
    function fn(num, times){
        if (num == 0){
            clearTimeout(timer);
            return;
        }
        console.log(new Date());
        var timer = setTimeout(function(){
            fn(num-1,times);
        },times);
    }
    fn(100, 5000);
5.setTimeout中第一个参数除了使用匿名函数包裹，还可以怎么调用一个含参函数



/**
 * 一道考题：
 * 确定考点：应该考察我 JavaScript 的运行机制的，让我理一下思路。
 * 首先先碰到一个 setTimeout，于是会先设置一个定时，在定时结束后将传递这个函数放到任务队列里面，因此开始肯定不会输出 1 。
 * 然后是一个 Promise，里面的函数是直接执行的，因此应该直接输出 2、3 。
 * 然后，Promise 的 then 应当会放到当前 tick 的最后，但是还是在当前 tick 中。
 * 因此，应当先输出 5，然后再输出 4 。最后在到下一个 tick，就是 1 。
 *  “2 3 5 4 1”
 * 
setTimeout(function () {
    console.log(1)
}, 0);
new Promise(function executor(resolve) {
    console.log(2);
    for (var i = 0; i < 10000; i++) {
        i == 9999 && resolve();
    }
    console.log(3);
}).then(function () {
    console.log(4);
});
console.log(5);

项目相关问题

HR面
1.  你是怎么想到要做前端开发呢？
2.  什么时候决定以后就把前端开发作为职业呢？
3.  写项目过程中遇到问题是怎么解决的
4.  秋招还投了其他公司吗？
5.  对工作地点的要求
6.  你是如何考虑去哪些公司？
7.  怎么看公司适不适合自己
8.  薪资上的要求
9.  父母对工作的看法
10. 有时间实习吗
11. 你为什么要来我们这个部门？
HR面：HR面并不水。。。面试官是一位非常美丽的小姐姐，全程带笑容面试，但是笑里藏刀，虽然是HR面，但是问的问题也是属于比较刁难的，
前面两面都没有涉及太多的项目，被HR面疯狂怼了。。。。
1，实习的时候具体都做了什么事？
2，你实习的项目具体的内容，你做了什么工作？
3，有没有看过别人类似的项目，你们的项目与同类型的项目有什么不一样的地方？
4，客户对你们的项目有什么期望，你们是怎么实现的？
5，你觉得你们的项目还有什么不足的地方，下一步要具体怎么做？
6，做项目的时候有没有跟领导和导师交流过，有没有提过什么建议？
7，找实习的时候为什么选中了这家公司，有什么吸引你的地方？
8，实习的时候觉得公司有什么地方没有达到你的预期？你是怎么看待这些的？
9，实习的时候跟同事相处得怎么样？
10，说出自己的三个优点和三个缺点，再具体举举例子
11，你平时手机上使用最多的APP有哪些，什么是别人没有的？
12，如果让你给我推荐一款新鲜的APP，你会怎么介绍，可以拿手机给我详细展示一下吗？（懵逼的我，第一反应是打开了“谁是卧底”）
13，对自己剩下的大学期间怎么规划？还有什么不足的地方要提升？
14，对未来的工作和公司有什么期望？期望薪资是多少？
15，除了网易，还投了哪些公司，结果怎么样？
16，对于网易，你有过什么了解，有什么期望？
17，家庭情况
作者：offer、快到碗里来
链接：https://www.nowcoder.com/discuss/38032
来源：牛客网


 */