
/*
//display: none;与visibility: hidden;的区别?
    联系：它们都能让元素不可见
    区别：
    1.display:none;会让元素完全从渲染树中消失，渲染的时候不占据任何空间；
        visibility: hidden;不会让元素从渲染树消失，渲染师元素继续占据空间，只是内容不可见
    2.display: none;是非继承属性，子孙节点消失由于元素从渲染树消失造成，通过修改子孙节点属性无法显示；
        visibility: hidden;是继承属性，子孙节点消失由于继承了hidden，通过设置visibility: visible;可以让子孙节点显式
    3.修改常规流中元素的display通常会造成文档重排。修改visibility属性只会造成本元素的重绘。
    4.读屏器不会读取display: none;元素内容；会读取visibility: hidden;元素内容

link与@import的区别
    link是HTML方式， @import是CSS方式
    link最大限度支持并行下载，@import过多嵌套导致串行下载，出现FOUC
    link可以通过rel="alternate stylesheet"指定候选样式
    浏览器对link支持早于@import，可以使用@import对老浏览器隐藏样式
    @import必须在样式规则之前，可以在css文件中引用其他文件
    总体来说：link优于@import

CSS有哪些继承属性
    font    word-break  letter-spacing  text-align  text-rendering
    word-spacing    white-space     text-indent     text-transform
    text-shadow     line-height     color       visibility      cursor


    
*/

