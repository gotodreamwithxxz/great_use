// 页面定时刷新的做法会有这样一些感觉不足的地方：

// 频繁的定时网络请求对浏览器（客户端）和服务器来说都是一种负担，尤其是当网页里有多个定时刷新区域的时候。
//      1.某几次的定时任务可能是不必要的，因为服务器可能并没有新数据，还是返回了和上一次一样的内容。
//      2.页面内容可能不够新，因为服务器可能刚更新了数据，但下一轮定时任务还没有开始。
//      3.造成这些不足的原因归结起来，主要还是由于服务器的响应总是被动的。HTTP协议限制了一次通信总是由客户端发起请求，再由服务器端来返回响应。
//      因此，如果让服务器端也可以主动发送信息到客户端，就可以很大程度改进这些不足。WebSocket就是一个实现这种双向通信的新协议。

var socket = new WebSocket("ws://localhost:8080/guest");

socket.onopen = function (openEvent) {
    console.log("WebSocket conntected.");
};

socket.onmessage = function (messageEvent) {
    var data = messageEvent.data,
        dataObject = JSON.parse(data);
    console.log("Guest at " + dataObject.time + ": " + dataObject.guest);
};

socket.onerror = function (errorEvent) {
    console.log("WebSocket error: ", errorEvent);
};

socket.onclose = function (closeEvent) {
    console.log("WebSocket closed.");
};

/**
 * GET ws://websocket.example.com/ HTTP/1.1
 * Host: websocket.example.com
 * Upgrade: websocket
 * Connection: Upgrade
 * Origin: http://example.com
 * Sec-WebSocket-Key:pAloKxsGSHtpIHrJdWLvzQ==
 * Sec-WebSocket-Version:13
 * 其中HTTP头部字段Upgrade: websocket和Connection: Upgrade很重要，告诉服务器通信协议将发生改变，转为WebSocket协议。
 * 支持WebSocket的服务器端在确认以上请求后，应返回状态码为101 Switching Protocols的响应：
 * 
 * HTTP/1.1 101 Switching Protocols
 * Upgrade: websocket
 * Connection: Upgrade
 * Sec-WebSocket-Accept: nRu4KAPUPjjWYrnzxDVeqOxCvlM=
 * 其中字段Sec-WebSocket-Accept是由服务器对前面客户端发送的Sec-WebSocket-Key进行确认和加密后的结果，相当于一次验证，
 * 以帮助客户端确信对方是真实可用的WebSocket服务器。
 */