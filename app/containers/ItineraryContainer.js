import React, { Component } from 'react';
import {getRoutes} from '../helpers/api'
import { Map, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';

// const MyPopupMarker = ({ layerContainer, map, position, children }) => (
//   <Marker draggable={this.state.draggable} onDragend={this.updatePosition} position={markerPosition} ref='marker'>
//     <Popup minWidth={90}>
//       <span onClick={this.toggleDraggable}>
//         {this.state.draggable ? 'DRAG MARKER' : 'MARKER FIXED'}
//         {children}
//       </span>
//     </Popup>
//   </Marker>
// );
//
// const MyMarkersList = ({ markers }) => {
//   const items = markers.map(({ key, props }) => (
//     <Marker draggable={this.state.draggable} onDragend={this.updatePosition} position={markerPosition} ref='marker'/>
//   ));
//   return <div style={{display: 'none'}}>{items}</div>;
// };

export default class ItineraryContainer extends Component {
  constructor() {
    super();

    this.state = {
      center: {
        lat: 51.505,
        lng: -0.09,
      },
      marker: {
        lat: -37.67041,
        lng: 144.8489,
      },
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

  componentDidMount(){
    // var baseC = this.state.segments;
    // var i;
    //
    // console.log('Begin Test');
    //
    // for (i = 0; i < baseC.length; i++) {
    //   console.log(baseC[i].segments[0]) // origin
    //   console.log(baseC[i].segments[0].lat)
    //   console.log(baseC[i].segments[0].lon)
    //   console.log(baseC[i].segments[1]) // desintation
    //   console.log(baseC[i].segments[1].lat)
    //   console.log(baseC[i].segments[1].lon)
    // }
  }

  render() {
    // const position = [this.state.center.lat, this.state.center.lng];
    const markerPosition = [this.state.marker.lat, this.state.marker.lng];

    // const markers = [
    //   {key: 'marker1', position: [51.5, -0.1], children: 'My first popup'},
    //   {key: 'marker2', position: [51.51, -0.1], children: 'My second popup'},
    //   {key: 'marker3', position: [51.49, -0.05], children: 'My third popup'},
    // ];
    //
    // var baseC = this.state.segments[0]; // type is object
    //
    // console.log('test');
    // console.log(baseC);

    var baseC = this.state.segments;

    // center camera to this - starting location
    const position = [baseC[0].segments[0].lat, baseC[0].segments[0].lon]

    var markers = []; // array of all markers to be loaded for the group
    for (var i = 0; i < baseC.length; i++) {
      // origin
      markers.push(
        <Marker
          draggable={this.state.draggable}
          position={[baseC[i].segments[0].lat, baseC[i].segments[0].lon]}
          ref='marker'>
          <Popup minWidth={100}>
            <span onClick={this.toggleDraggable}>
              {/*{this.state.draggable ? 'DRAG MARKER' : 'MARKER FIXED'}*/}
              ORIGIN
            </span>
          </Popup>
        </Marker>
      );

      // destination
      markers.push(
        <Marker
          draggable={this.state.draggable}
          position={[baseC[i].segments[1].lat, baseC[i].segments[1].lon]}
          ref='marker'>
          <Popup minWidth={100}>
            <span onClick={this.toggleDraggable}>
              {/*{this.state.draggable ? 'DRAG MARKER' : 'MARKER FIXED'}*/}
              DESTINATION
            </span>
          </Popup>
        </Marker>
      );
    }

    // const position = [this.state.center.lat, this.state.center.lng];

    return (

      // console.log('Segments Below'),
      // console.log(this.state.segments[0]),
      // console.log('Segments Above'),




      <div>

      {/*{JSON.parse(this.state.segments)}*/}

      {/*{JSON.stringify(baseC)}*/}

      {/*<p>{baseC.segments}</p>*/}





      {/*{JSON.stringify(this.state.segments[0])}*/}

      {/*var parsed = {JSON.parse(JSON.stringify(this.state.segments))}*/}
      {/*<p>{parsed[0]}</p>*/}


      <Map center={position} zoom={this.state.zoom} zoomControl={false}>
        <TileLayer
          url='http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">
            OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com
            /attributions">CartoDB</a>'
        />
        {/*<Marker
          draggable={this.state.draggable}
          onDragend={this.updatePosition}
          position={markerPosition}
          ref='marker'>
          <Popup minWidth={90}>
            <span onClick={this.toggleDraggable}>
              {this.state.draggable ? 'DRAG MARKER' : 'MARKER FIXED'}
            </span>
          </Popup>
        </Marker>*/}

        {markers}


        <ZoomControl position='bottomright' />
      </Map>

      </div>
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
