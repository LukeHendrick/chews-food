const express = require('express');
const app = express();
const api = require('./api.js');
const commonPaths = require('./build-utils/common-paths')

app.get('/api/search/*', function(req, res) {
    searchReq = req.query
    searchReq.latitude = Number(searchReq.latitude)
    searchReq.longitude = Number(searchReq.longitude);
    
    api.yelpGet(searchReq).then((data) => {
        res.send(data);
    });
});

app.listen(3000, function() {
    console.log('App listening on port 3000!');
});