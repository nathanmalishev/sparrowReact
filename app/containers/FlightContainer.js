import React, { Component } from 'react';
import FlightSearchContainer from './FlightSearchContainer'
import {getFlights} from '../helpers/rome2rio'
import FlightResults from '../components/FlightResults'

export default class FlightContainer extends Component {
  constructor() {
    super();
    this.state = {
      to: '',
      from: '',
      results:false,
      flightData: {}
    };

    this.onFlightClick = this.onFlightClick.bind(this);
  }

  onFlightClick(to, from) {
    //TODO: make flight call API
    console.log(to+from)

    
    getFlights(to,from)
      .then((data)=>{
        console.log(data)
        this.setState({
          to,
          from,
          results: true,
          flightData: data.data
        })
      })
    
  }

  render() {
    console.log(this.props,'aa')
    return (
      <div>
        <p>Flight container, with flight data</p>

        <FlightSearchContainer handleFlightClick={this.onFlightClick}/>

        {
          this.state.results === true
            ? <FlightResults to={this.state.to} from={this.state.from} data={this.state.flightData}/>
            : <p></p>
        }

        {JSON.stringify(this.props.destination.flights)}
      </div>
    );
  }
}

//data={this.state.flightData}
