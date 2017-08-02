import React, { Component } from 'react';
import { Thumbnail, Grid, Col, Row, Button } from 'react-bootstrap';
import 'whatwg-fetch';
function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item)});
    return images;
}

const images = importAll(require.context('../images', false, /\.png/));


export default class Chosen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loc: {},
        }
        this.handleAllGet = this.handleAllGet.bind(this);
    }
    componentDidMount() {
        
        this.setState(() => {
            return {
                loc: this.props.loc,
            }
        })
    }

    handleAllGet() {
        fetch('/api/all')
        .then((res) => res.json())
        .then((data) => console.log(data))
    }
    render() {
        let loc = this.state.loc;
        console.log(loc)
        let rating = loc.rating;
        let address = (loc.location) ? loc.location.display_address : []
        let imgUrl = (loc.image_url) ? loc.image_url.replace(/o\.jpg/, '348s.jpg') : images['noImg.png']
        return (
                    <Thumbnail className="yelp-image" src={imgUrl} alt={loc.name}>
                        <h3>{loc.name}</h3>
                        {address.map((addLine, i) => <p key={i}>{addLine}</p>)}
                        <img src={images[`extra_large_${Number.isInteger(rating) ? rating : Math.floor(rating).toString().concat("_half")}.png`]}
                            alt={loc.name} /><a href={loc.url}><img className="yelp-logo" src={images['yelp.png']} /></a><label className="based">&nbsp;Based on {loc.review_count} reviews</label>
                    </Thumbnail>
            )
        } 
}