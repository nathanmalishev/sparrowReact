import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import {getRoutes} from '../helpers/api'


export default class SimpleExample extends Component {
  constructor() {
    super();
    this.state = {
      lat: 51.505,
      lng: -0.09,
      zoom: 13,

      segments:[]
    };
  }

  componentDidMount(){
    this.setState({
      segments: this.props.flights
    })

    getRoutes(this.props.params.id)
      .then((res)=>{
        console.log(res)
        this.setState({
          segments: res.data
        })
      })
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (

      <div>

      {JSON.stringify(this.state.segments)}

      <Map center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Marker position={position}>
          <Popup>
            <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
          </Popup>
        </Marker>
      </Map>

      </div>
    );
  }
}