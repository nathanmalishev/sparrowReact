import React, { Component } from 'react';
import FlightSearchContainer from './FlightSearchContainer'

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
    this.setState({
      to,
      from,
      results: true
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
            ? <p>Results from {this.state.from} to {this.state.to}</p>
            : <p></p>
        }

        {JSON.stringify(this.props.destination.flights)}
      </div>
    );
  }
}
