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
        console.log("API DATA")
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
    console.log(this.props,'Flight container props')
    return (
      <div>

        <FlightSearchContainer handleFlightClick={this.onFlightClick} destination={this.props.destination}/>

        {
          this.state.results === true
            ? <FlightResults groupId={this.props.groupId} data={this.state.flightData}/>

            : <p></p>
        }

      </div>
    );
  }
}

//data={this.state.flightData}
