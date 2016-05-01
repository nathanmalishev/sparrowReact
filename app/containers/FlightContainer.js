import React, { Component } from 'react';
import FlightSearchContainer from './FlightSearchContainer'

export default class FlightContainer extends Component {
  constructor() {
    super();
    this.state = {
      flightData: {}
    };

    this.onFlightClick = this.onFlightClick.bind(this);
  }

  onFlightClick(to, from) {
    //TODO: make flight call API
    console.log(to+from)
  }

  render() {
    console.log(this.props,'aa')
    return (
      <div>
        <p>Flight container, with flight data</p>

        <FlightSearchContainer handleFlightClick={this.props.onFlightClick}/>

        {JSON.stringify(this.props.destination.flights)}
      </div>
    );
  }
}
