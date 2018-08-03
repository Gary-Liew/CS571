
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:name/:city/:state/:country/:address1', function(req, res, next) {
    var request = require("request");
    var name = req.params.name;
    var city = req.params.city;
    var state = req.params.state;
    var country = req.params.country;
    var address1 = req.params.address1;

    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    //name: 'USC', city: 'San Francisco', state: 'CA', country:'US',
    //name: name, city: city, state: state, country:country,
    var options = { method: 'GET',
        url: 'https://api.yelp.com/v3/businesses/matches/best',
        qs: { name: name, city: city, state: state, country:country, address1:address1 },
        headers:
            {
                Authorization: 'Bearer midtK9Sb4zLFFLdrkwfErwmIbJDqYLsHSb78EaLrfwjN4UrBGHhQjGhG8SZM6x0GKq8V9ef5ZXh81Y29nGwHJiG1EgwVnvX3A50kowD0IcTaB5jY6rjowx2WXInCWnYx' } };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
        res.end(body);
    });
});

module.exports = router;