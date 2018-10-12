const axios = require('axios');
const querystring = require('querystring');
const token = `Bearer ${process.env.MY_YELP_TOKEN}`
module.exports = {
    yelpGet: (query) => {
        var url = "https://api.yelp.com/v3/businesses/search";
        return axios.get(url, { 'params': query, 'headers': { 'Authorization': token} })
            .then((res) => {
                return res.data.businesses;
            }).catch((e) => {
                console.log("ERROR FOUND")
                console.log(e)
            });
    }
}