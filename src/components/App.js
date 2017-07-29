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
                <Chosen locs={locs}/>
            )
        } else {
            return (
                <Chews yelpGet={this.handleYelpGet} />
            )
            
        }
    }
}
