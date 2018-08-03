var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:nextpagetoken', function(req, res, next) {
    //var location = req.params.location;
    //var name = req.params.symbol;

    var nextpagetoken=req.params.nextpagetoken;

    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');


    const https = require('https');
    // https://www.alphavantage.co/query?function=SMA&symbol=AAPL&interval=daily&time_period=10&series_type=close&apikey=B1FXC27WA1HL6WAO&outputsize=full
    //apiurl="https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=34.0223519,-118.285117&radius=16090&type=cafe&keyword=usc&key=AIzaSyDpwobkPxkUkpKZdboGYuqdlwjoMK-s2-o";
    apiurl="https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken="+nextpagetoken+"&key=AIzaSyDpwobkPxkUkpKZdboGYuqdlwjoMK-s2-o";
    const request = https.get(apiurl,function(response) {
        var size = 0;
        var chunks = [];
        response.on('data', function(chunk){
            size += chunk.length;
            chunks.push(chunk);
        });
        response.on('end', function(){
            data = Buffer.concat(chunks, size).toString('utf8');
            console.log(data);
            res.end(data);
        });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });
    //request.end(name);
});