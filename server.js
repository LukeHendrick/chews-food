const express = require('express');
const compression = require('compression')
const app = express();
const api = require('./api.js');
const commonPaths = require('./build-utils/common-paths')
const PORT = process.env.PORT || 3000;
let allData;
app.use('*', (req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect('https://' + req.headers.host + req.url)
    } else {
        return next();
    }
})
app.use(compression());
app.use(express.static(__dirname + '/dist'));

app.get('/', (req, res) => {
    res.sendFile('index.html');
})

app.get('/api/search/*', function(req, res) {
    searchReq = req.query
    searchReq.latitude = Number(searchReq.latitude)
    searchReq.longitude = Number(searchReq.longitude);
    
    api.yelpGet(searchReq).then((data) => {
        let x = Math.round(Math.random() * (data.length - 1))
        allData = data;
        if (data.length === 1) {
            res.send(data[0])
        } else if (data.length === 0) {
            res.send({id: "Not Found"});
        } else {
            res.send(data[x])
        }
    });
});

app.get('/api/all', (req, res) => {
    res.send(allData);
})

app.listen(PORT, function() {
    console.log(`App listening on port ${PORT}!`);
});