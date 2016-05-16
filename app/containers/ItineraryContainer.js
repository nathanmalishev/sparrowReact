import React, { Component } from 'react';
import {getRoutes} from '../helpers/api'
import { Map, TileLayer, Marker, Popup, ZoomControl, Polyline } from 'react-leaflet';

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

  render() {
    var markerData = this.state.segments;
    var melbournePos = [-37.8141, 144.9633]

    // if no flight data is currently present
    // return an empty map that's centered on Melbourne
    if(!markerData[0]){
      return (
          <div>
            <Map center={melbournePos} zoom={2} zoomControl={false}>
              <TileLayer
                url='http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
                attribution='&copy; <a href="http://www.openstreetmap.org/copyright">
                  OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com
                  /attributions">CartoDB</a>'
              />
              <ZoomControl position='bottomright' />
            </Map>
          </div>
        )
    }

    // center camera to this - starting location
    const position = [markerData[0].segments[0].lat, markerData[0].segments[0].lon]

    var polyLine = [];  // array of all the coordinates for the lines to be drawn
    var markers = []; // array of all markers to be loaded for the group
    for (var i = 0; i < markerData.length; i++) {
      // origin
      markers.push(
        <Marker
          position={[markerData[i].segments[0].lat, markerData[i].segments[0].lon]}
          ref='marker'>
          <Popup minWidth={120}>
            <span onClick={this.toggleDraggable}>
            <h5>{markerData[i].segments[0].lat},{markerData[i].segments[0].lon}</h5>
            </span>
          </Popup>
        </Marker>
      );

      // destination
      markers.push(
        <Marker
          position={[markerData[i].segments[1].lat, markerData[i].segments[1].lon]}
          ref='marker'>
          <Popup minWidth={120}>
            <span onClick={this.toggleDraggable}>
            <h5>{markerData[i].segments[1].lat},{markerData[i].segments[1].lon}</h5>
            </span>
          </Popup>
        </Marker>
      );

      // populate the line array
      polyLine.push(
        [markerData[i].segments[0].lat,markerData[i].segments[0].lon],
        [markerData[i].segments[1].lat,markerData[i].segments[1].lon]
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
          <Polyline color='aqua' positions={polyLine} />
          <ZoomControl position='bottomright' />
        </Map>

      </div>
    );
  }
}
