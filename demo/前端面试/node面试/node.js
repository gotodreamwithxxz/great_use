/**
 * @author lijiaqi
 * @param node学习
 * 
 */

/**
 * node.js简单的 Http Server
 */
var http = require('http');
http.createServer(function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' }); 
    // HTTP Response 头部
    response.end('Hello World\n'); 
    // 返回数据 “Hello World”
})
.listen(8888); 
// 监听 8888 端口
// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');  

/**
 * 
 * 为什么要用 Node.js？？？？至少我们应该知道在什么场景下，选择 Node.js 更合适？？？？
 *      1.实时性应用，比如在线多人协作工具，网页聊天应用等。
 *      2.以 I/O 为主的高并发应用，比如为客户端提供 API，读取数据库。
 *      3.流式应用，比如客户端经常上传文件。
 *      4.前后端分离。
 *      前两者(1,2)可以归结为一种，即客户端广泛使用长连接，虽然并发数较高，但其中大部分是空闲连接。
 *      Node.js 也有它的局限性，它并不适合 CPU 密集型的任务，比如人工智能方面的计算，视频、图片的处理等。
 * 
 *      服务器端的基本概念：
 *      1.并发：服务器最多能支持多少个客户端的并发请求
 *      2.非阻塞 I/O：
 * 
 */