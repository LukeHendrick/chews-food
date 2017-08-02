import React, { Component } from 'react';
import Chews from './Chews';
import Chosen from './Chosen';
import Navi from './Navi'

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
        fetch(`/api/search/?term=${searchRequest.term}&categories=${searchRequest.categories}&latitude=${Number(searchRequest.latitude)}&longitude=${searchRequest.longitude}&radius=${searchRequest.radius}&price=${searchRequest.price}`)
        .then((res) => res.json())
        .then((data) => {
            this.setState(() => {
                return {
                    loc: data,
                    loaded: true
                }
            })
        })
    }


    render() {
        let loc = this.state.loc
        if (this.state.loaded) {
            let address = loc.location.display_address.join(' ')
            let direct = `http://maps.google.com/?q=${address}`
            console.log(address);
            let options = [{
                title: "Directions",
                link: direct
            }]
            return (
                <div>    
                <Chosen loc={loc}/>
                <Navi options={options} />
                </div>
            )
        } else {
            let options = [{
                title: null,
            }]
            console.log((options[0].title == true));
            return (
                <div>
                <Chews yelpGet={this.handleYelpGet} />
                <Navi options={options} />
                </div>
            )
            
        }
    }
}
