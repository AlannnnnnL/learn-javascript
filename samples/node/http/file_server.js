'use strict';
// 文件服务器

var
    fs = require('fs'),
    url = require('url'),
    path = require('path'),
    http = require('http');
var root = path.resolve(process.argv[2] || '.');
console.log('Static root dir: ' + root);

// 创建服务器
var server = http.createServer(function (request, response) {
    // 获得URL的path，类似'/css/bootstrap.css';
    var pathname = url.parse(request.url).pathname;
    console.log('pathname:' + pathname);
    // 获取对应的本地文件路径, 类似'/src/www/css/bootstrap.css';
    var filepath = path.join(root, pathname);
    console.log('filepath:' + filepath);
    // 默认查找的文件
    var defaultFile = ['default.html', 'index.html'];
    readFile(filepath);
    function readFile(filepath) {
        // 获取文件状态;
        fs.stat(filepath, function (err, stats) {
            if (!err && stats.isFile()) {
                // 没有错误并且文件存在
                // 发送200响应
                response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
                // 将文件流导向response
                fs.createReadStream(filepath).pipe(response);
            } else if (defaultFile.length > 0) {
                // 目录存在,默认搜索sample.txt
                filepath = path.join(root, defaultFile.shift(1));
                console.log('默认filepath:' + filepath);
                readFile(filepath);
            } else {
                // 出错了或者文件不存在
                response.writeHead(404);
                response.end('404 Not Found');
            }
        });
    }
});
server.listen(8080);
console.log('Server is running at http://127.0.0.1:8080/');
