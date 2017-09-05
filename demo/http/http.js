//搭建简单node服务
var http = require('http');
http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('hello end');

}),listen(2017)