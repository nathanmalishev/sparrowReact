import React, { Component } from 'react';
import FlightSearchContainer from './FlightSearchContainer'
import {getFlights} from '../helpers/rome2rio'
import {postRoute} from '../helpers/api'
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
        console.log('API DATA')
        console.log(data)
        this.setState({
          to,
          from,
          results: true,
          flightData: data.data
        })
      })

  }

  handleSelect(segments){
    segments.user = this.props.authUser;

    postRoute(this.props.params.id, segments)
      .then((res)=>{
        //data saved in db
        setTimeout(()=>{
          this.props.history.pushState(null, `group/${this.props.params.id}/itinerary`)}
          , 300)
      })
  }

  render() {
    console.log(this.props,'Flight container props')
    return (
      <div>

        <FlightSearchContainer handleFlightClick={this.onFlightClick} destination={this.props.destination}/>

        {
          this.state.results === true
            ? <FlightResults groupId={this.props.groupId} data={this.state.flightData} onSelect={this.handleSelect.bind(this)}/>
            : <p></p>
        }

      </div>
    );
  }
}

//data={this.state.flightData}
