const axios = require('axios');
const querystring = require('querystring');
const token = `Bearer ${process.env.MY_YELP_TOKEN}`
module.exports = {
    yelpGet: (query) => {
        var url = "https://api.yelp.com/v3/businesses/search";
        var token = 'Bearer aHiwuqAN04KexWk4nudWsUNnqi3qYJXuVunPytCTc3EH7fRF4RoCu_Rkr5EpUJrl533Qsc1wUfv36MM0dF7i-58T900Ju8wt06L0-mwNktFV7Vlgm4uZWZAsvGJ3WXYx';
        return axios.get(url, { 'params': query, 'headers': { 'Authorization': token} })
            .then((res) => {
                return res.data.businesses;
            }).catch((e) => {
                console.log("ERROR FOUND")
                console.log(e)
            });
    }
}