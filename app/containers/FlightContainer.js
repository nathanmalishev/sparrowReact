import React, { Component } from 'react';

export default class FlightContainer extends Component {
  render() {
    console.log(this.props,'aa')
    return (
      <div>
        <p>Flight container, with flight data</p>
        {JSON.stringify(this.props.destination.flights)}
      </div>
    );
  }
}
