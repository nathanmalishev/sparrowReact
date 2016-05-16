import React, { Component } from 'react';
import {getRoutes} from '../helpers/api'
import { Map, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';


const styles = {
  popup: {
    alignItems: 'center',
    border: '1px',

  }
}

export default class ItineraryContainer extends Component {
  constructor() {
    super();

    this.state = {
      zoom: 2,
      segments:[],
      draggable: true,
    };

    this.toggleDraggable = () => {
      this.setState({draggable: !this.state.draggable});
    };

    this.updatePosition = () => {
      const { lat, lng } = this.refs.marker.getLeafletElement().getLatLng();
      this.setState({
        marker: {lat, lng},
      });
    };
  }

  componentWillMount() {
    // Load data ahead of time otherwise will run into issues when accessing
    // the js object
    this.setState({
      segments: this.props.flights
    })

    getRoutes(this.props.params.id).then((res) => {
      console.log(res)
      this.setState({
        segments: res.data
      })
    })
  }

  componentDidMount() {

  }

  render() {
    var markerData = this.state.segments;


    if(!markerData[0]){
      return (
          <div>
            <p>Please find a flight</p>
          </div>
        )
    }


    // center camera to this - starting location
    const position = [markerData[0].segments[0].lat, markerData[0].segments[0].lon]

    var markers = []; // array of all markers to be loaded for the group
    for (var i = 0; i < markerData.length; i++) {
      // origin
      markers.push(
        <Marker
          draggable={this.state.draggable}
          position={[markerData[i].segments[0].lat, markerData[i].segments[0].lon]}
          ref='marker'>
          <Popup minWidth={120}>
            <span onClick={this.toggleDraggable}>
            <h3><strong>Location Name</strong></h3>
            <h3>ORIGIN</h3>
            </span>
          </Popup>
        </Marker>
      );

      // destination
      markers.push(
        <Marker
          draggable={this.state.draggable}
          position={[markerData[i].segments[1].lat, markerData[i].segments[1].lon]}
          ref='marker'>
          <Popup minWidth={120}>
            <span onClick={this.toggleDraggable}>
            <h3><strong>Location Name</strong></h3>
            <h3>DESTINATION</h3>
            </span>
          </Popup>
        </Marker>
      );
    }

    return (
      <div>
        <Map center={position} zoom={this.state.zoom} zoomControl={false}>
          <TileLayer
            url='http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">
              OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com
              /attributions">CartoDB</a>'
          />
          {markers}
          <ZoomControl position='bottomright' />
        </Map>

      </div>
    );
  }
}

