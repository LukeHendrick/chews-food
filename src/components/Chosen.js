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
        let loc = this.state.loc
        let rating = loc.rating        
        return (
            <Grid>
                <Col xs={12} md={8} lg={4}> 
                    <Thumbnail className="yelp-image" src={loc.image_url} alt={loc.name}>
                        <h3>{loc.name}</h3>
                        <p>Description</p>
                        <img src={images[`extra_large_${Number.isInteger(rating) ? rating : Math.floor(rating).toString().concat("_half")}.png`]}
                            alt={loc.name} /><label>&nbsp;Based on {loc.review_count} reviews</label>
                    </Thumbnail>
                </Col>
                <Button className="getAll" bsSize="large" onClick={this.handleAllGet}>Get All </Button>
                <Button className="getAll" bsSize="large">Get There</Button>
                <Button className="getAll" bsSize="large">Go to Yelp!</Button>
            </Grid>
            )
        } 
}