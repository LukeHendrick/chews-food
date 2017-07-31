import React, { Component } from 'react';
import Chews from './Chews';
import Chosen from './Chosen';

export default class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loaded: false,
            locs: []
        }

        this.handleYelpGet = this.handleYelpGet.bind(this);
    }

    handleYelpGet(searchRequest) {
        fetch(`/api/search/?term=${searchRequest.term}&categories=${searchRequest.categories}&latitude=${Number(searchRequest.latitude)}&longitude=${searchRequest.longitude}&radius=${searchRequest.radius}`)
        .then((res) => res.json())
        .then((data) => {
            this.setState(() => {
                return {
                    loc: data,
                    loaded: true
                }
            })
            console.log(data);
        })
    }


    render() {
        let loc = this.state.loc
        if (this.state.loaded) {
            return (
                <Chosen loc={loc}/>
            )
        } else {
            return (
                <Chews yelpGet={this.handleYelpGet} />
            )
            
        }
    }
}
