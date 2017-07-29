import React, { Component } from 'react';
import Chews from './Chews'


export default class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loaded: false,
            locs: []
        }

        this.handleYelpGet = this.handleYelpGet.bind(this);
    }

    handleYelpGet(data) {
        this.setState(() => {
            return {
                locs: data,
                loaded: true
            }
        })
    }


    render() {
        let locs = this.state.locs
        if (this.state.loaded) {
            return (
                <div>
                {locs.map((loc, i) => <h1 key={i}>{loc.name}</h1>)}
                </div>
            )
        } else {
            return (
                <Chews yelpGet={this.handleYelpGet} />
            )
            
        }
    }
}
