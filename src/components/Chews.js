import React, { Component } from 'react';
import { Modal, Button, ButtonGroup } from 'react-bootstrap';
import 'whatwg-fetch'



export default class Chews extends Component {
    constructor(props) {
        super(props);

        this.state = {
            locs: [],
            loaded: false,
            categories: [],
            price: 2,
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
        let radius = e.target.value;

        this.setState(() => {
            return {
                radius: radius
            }
        })
    }

    handlePriceChange(e) {
        let price = e.target.value

        this.setState(() => {
            return {
                price: price
            }
        })
        console.log(this.state.price);
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
        e.preventDefault();
        navigator.geolocation.getCurrentPosition((pos) => {
            let searchRequest = {
                term: 'restaurants',
                categories: this.state.categories,
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
                radius: Math.round(this.state.radius / 0.00062137),
            }
            fetch(`/api/search/?term=${searchRequest.term}&categories=${searchRequest.categories}&latitude=${Number(searchRequest.latitude)}&longitude=${searchRequest.longitude}&radius=${searchRequest.radius}`)
                .then((res) => res.json())
                .then((data) => {
                    this.props.yelpGet(data)
                    console.log(data);
                })
        })
    }

    render() {
        return (
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>Chews Some Food!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={this.handleSubmit}>
                        <input onChange={this.handleCatChange}
                            type="checkbox"
                            name="Chinese"
                            value="chinese" /><label>Chinese</label><br></br>
                        <input onChange={this.handleCatChange}
                            type="checkbox"
                            name="Mexican"
                            value="mexican" /><label>Mexican</label><br></br>
                        <input onChange={this.handleCatChange}
                            type="checkbox"
                            name="Pizza"
                            value="pizza" /><label>Pizza</label><br></br>
                        <input onChange={this.handleCatChange}
                            type="checkbox"
                            name="Burgers"
                            value="burgers" /><label>Burgers</label><br></br><br></br>
                        <label>Price: </label><br></br>
                        <ButtonGroup className="price">
                            <Button onClick={this.handlePriceChange} value={1}
                                className={this.state.price === 1 ? "active" : "notActive"}>$</Button>
                            <Button onClick={this.handlePriceChange} value={2}
                                className={this.state.price === 2 ? "active" : "notActive"}>$$</Button>
                            <Button onClick={this.handlePriceChange} value={3}
                                className={this.state.price === 3 ? "active" : "notActive"}>$$$</Button>
                            <Button onClick={this.handlePriceChange} value={4}
                                className={this.state.price === 4 ? "active" : "notActive"}>$$$$</Button>
                        </ButtonGroup><br></br><br></br>
                        <label>Distance: </label><br></br>
                        <ButtonGroup className="radius">
                            <Button onClick={this.handleRadiusChange} value={2} className={this.state.radius === 2 ? "active": "notActive"}> 2 Miles</Button>
                            <Button onClick={this.handleRadiusChange} value={5} className={this.state.radius === 5 ? "active": "notActive"}> 5 Miles</Button>
                            <Button onClick={this.handleRadiusChange} value={10} className={this.state.radius === 10 ? "active": "notActive"}> 10 Miles </Button>
                        </ButtonGroup><br></br>
                        <br></br>
                        <Button className="btn-danger" type="submit" value="Submit">Submit</Button>
                    </form>
                </Modal.Body>
            </Modal.Dialog>
        )
    }
}