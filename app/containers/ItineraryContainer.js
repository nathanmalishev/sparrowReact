import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';

export default class DraggableExample extends Component {
  constructor() {
    super();

    this.state = {
      center: {
        lat: 51.505,
        lng: -0.09,
      },
      marker: {
        lat: 51.505,
        lng: -0.09,
      },
      zoom: 13,
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

  render() {
    const position = [this.state.center.lat, this.state.center.lng];
    const markerPosition = [this.state.marker.lat, this.state.marker.lng];

    return (
      <Map center={position} zoom={this.state.zoom} zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Marker
          draggable={this.state.draggable}
          onDragend={this.updatePosition}
          position={markerPosition}
          ref='marker'>
          <Popup minWidth={90}>
            <span onClick={this.toggleDraggable}>
              {this.state.draggable ? 'DRAG MARKER' : 'MARKER FIXED'}
            </span>
          </Popup>
        </Marker>
        <ZoomControl position='bottomright' />
      </Map>
    );
  }
}

// export default class SimpleExample extends Component {
//   constructor() {
//     super();
//     this.state = {
//       lat: 51.505,
//       lng: -0.09,
//       zoom: 13,
//     };
//   }
//
//   render() {
//     const position = [this.state.lat, this.state.lng];
//     return (
//       <Map center={position} zoom={this.state.zoom}>
//         <TileLayer
//           url=
//           attribution=
//         />
//         <Marker position={position}>
//           <popup>
//             <span>test marker. <br/> Easily customizable.</span>
//           </popup>
//         </Marker>
//       </Map>
//     );
//
//     <script>
//     L.mapbox.accessToken = 'pk.eyJ1IjoiaGFvbGUiLCJhIjoiY2lvN2d0bDgyMDJsMXcza2o5MjFsYzE0MCJ9.sqj-JRhHUmbdxBzHYyqyYQ';
//        var map = L.mapbox.map('map', 'mapbox.streets');
//        L.control.locate().addTo(map);
//      </script>
//   }
// }

/* Leaflet makes direct calls to the DOM when it is loaded, therefore this
 *  library is not compatible with server-side rendering
 * The components exposed are abstractions for Leaflet layers, not DOM elements.
 *  Some of them have properties that can be updated directly by calling the
 *  setters exposed by Leaflet while others should be completely replaced, by
 *  setting a unique value on their key property so that they are properly
 *  handled by React's algorithm.
 * Not all layers are implemented and even less tested.
 * url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
 */

/*
<Map center={position} zoom={this.state.zoom}>
  <TileLayer
    url='https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiaGFvbGUiLCJhIjoiY2lvN2h3eW1pMDJteHZibHp4dXZyampkbCJ9.iJV_Q_s4rHAEIIqvoprlag'
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  />
  <Marker position={position}>
    <Popup>
      <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
    </Popup>
  </Marker>
</Map>
*/
