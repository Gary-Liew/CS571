var express = require('express');//express 是框架，用npm安装。
var router = express.Router();//路由用于分路径

/* GET home page. */
//router.get 获取url数据，req指前端提交的东西，res指后端处理返回的内容
router.get('/:address', function(req, res, next) {
    // res.render('index', { title: 'Express' });
//    The encodeURIComponent() function encodes a Uniform Resource Identifier (URI) component by replacing each instance of certain characters by one, two, three, or four escape sequences representing the UTF-8 encoding of the character
//    指的就是get里面的address
    var address=encodeURIComponent(req.params.address);
    var name = req.params.stock;
    var data = "";
    //后端返回一个http相应
    //跨域请求的header的属性。
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    //请求http特性，相当于导入一个包
    const https = require('https');

    apiurl="https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&key=AIzaSyDBMobuO8lyXMgictZsZf0dOd2kH7-Tpxs";
    const request = https.get(apiurl,function(response) {
        var size = 0;
        var chunks = [];
//on相当于一个监听，on data相当于有这个数据的时候，监听数据，chunk相当于data中的数据
        response.on('data', function(chunk){
            size += chunk.length;
            chunks.push(chunk);
        });
        //监听google api 的end事件，concat连接这些内容。res.end相当于发送数据到前端。
        response.on('end', function(){
            data = Buffer.concat(chunks, size).toString('utf8');
            console.log(data);
            res.end(data);
        });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });
});

module.exports = router;

