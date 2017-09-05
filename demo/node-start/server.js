var http = require('http');
http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('hello world! \n');
}).listen(1337, '10.128.3.112');
console.log('server is running!')