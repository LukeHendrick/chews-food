import React, { Component } from 'react';
import Loading from './Loading';
import { Thumbnail, Grid, Col, Row } from 'react-bootstrap';

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
            loading: true,
        }
    }
    componentDidMount() {
        let x = Math.round(Math.random() * (this.props.locs.length - 1) + 1)
        this.setState(() => {
            return {
                loc: this.props.locs[x],
                loading: false,
            }
        })
    }
    render() {
        if (!this.state.loading) {
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
                </Grid>
            )
        } else {
            return (
                <Loading />
            )
        }
    }
}