import React, { Component } from 'react';
import { Modal, Button, ButtonGroup } from 'react-bootstrap';
import categories from '../categories.js'
import 'whatwg-fetch'



export default class Chews extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            categories: [],
            prices: [1,2],
            latitude: 0,
            longitude: 0,
            radius: 5
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCatChange = this.handleCatChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleRadiusChange = this.handleRadiusChange.bind(this);
    };

    handleRadiusChange(e) {
        let radius = Number(e.target.value);

        this.setState(() => {
            return {
                radius: radius
            }
        })
    }

    handlePriceChange(e) {
        let price = Number(e.target.value)
        let priceArr = Array.apply(null, Array(price + 1)).map(function (_, i) { return i; })
        console.log(price);
        priceArr.shift();
        this.setState(() => {
            return {
                prices: priceArr
            }
        })
    }

    handleCatChange(e) {
        let category = e.target.value;

        if (this.state.categories.includes(category)) {
            let catArr = this.state.categories;
            let catIndex = catArr.indexOf(category);
            catArr.splice(catIndex, 1);
            this.setState(() => {
                return {
                    categores: catArr,
                }
            })
        } else {
            this.setState(() => {
                return {
                    categories: this.state.categories.concat(category)
                }
            })
        }

    }

    handleSubmit(e) {
        this.setState(() => {
            return {
                loading: true
            }
        })
        e.preventDefault();
        navigator.geolocation.getCurrentPosition((pos) => {
            let searchRequest = {
                term: 'restaurants',
                categories: this.state.categories,
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
                radius: Math.round(this.state.radius / 0.00062137),
                price: this.state.prices.join(', ')
            }
            this.props.yelpGet(searchRequest)
            })
    }

    render() {
        console.log(this.state.prices);
        let isLoading = this.state.loading;
        return (
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title className="chews-title">Select cuisine(s): </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='catContainer'>
                    {categories.map((cat, i) => {
                        return (
                            <Button key={i} bsSize='lg' 
                            className={(this.state.categories.indexOf(cat.value) > -1) ? 'active catItem' : 'notActive catItem'} 
                            onClick={this.handleCatChange}
                            name={cat.name} value={cat.value}>{cat.name}</Button>
                        )
                    })}    
                    </div>
                    <hr></hr>
                    <form onSubmit={this.handleSubmit}>
                        <label className='price'>Price: </label><br></br>
                        <ButtonGroup className="price">
                            <Button bsSize='lg' onClick={this.handlePriceChange} value={1}
                                className={(this.state.prices.indexOf(1) > -1) ? "active price" : "notActive price"}>$</Button>
                            <Button bsSize='lg' onClick={this.handlePriceChange} value={2}
                                className={(this.state.prices.indexOf(2) > -1) ? "active price" : "notActive price"}>$$</Button>
                            <Button bsSize='lg' onClick={this.handlePriceChange} value={3}
                                className={(this.state.prices.indexOf(3) > -1) ? "active price" : "notActive price"}>$$$</Button>
                            <Button bsSize='lg' onClick={this.handlePriceChange} value={4}
                                className={(this.state.prices.indexOf(4) > -1) ? "active price" : "notActive price"}>$$$$</Button>
                        </ButtonGroup><br></br><br></br>
                        <label className='radius'>Distance: </label><br></br>
                        <ButtonGroup className="radius">
                            <Button bsSize='lg' onClick={this.handleRadiusChange} value={2} className={this.state.radius === 2 ? "active radius": "notActive radius"}> 2 Miles</Button>
                            <Button bsSize='lg' onClick={this.handleRadiusChange} value={5} className={this.state.radius === 5 ? "active radius": "notActive radius"}> 5 Miles</Button>
                            <Button bsSize='lg' onClick={this.handleRadiusChange} value={10} className={this.state.radius === 10 ? "active radius": "notActive radius"}> 10 Miles </Button>
                        </ButtonGroup><br></br>
                        <br></br>
                        <Button 
                        disabled={isLoading}
                        className="submit" 
                        type="submit" 
                        value="Submit">{isLoading ? 'Loading...' : 'Submit'}</Button>
                    </form>
                </Modal.Body>
            </Modal.Dialog>
        )
    }
}