import React, { Component } from 'react'
import {Accordion, Panel, Button} from 'react-bootstrap'
import {addRoute} from '../helpers/api'
import _ from 'lodash'

//Renders flight results data passed to it
export default class FlightResults extends Component {

  constructor() {
    super();
    this.state = {
      message:''
    }
  }

  routeDisplay(route) {
    var segs = route.segments.map(function(seg) {
      return (
        <div>
          <h6>LEG {route.segments.indexOf(seg) + 1}</h6>
          <h5><strong> {seg.kind.toUpperCase()}</strong> - {seg.duration + seg.transferDuration} minutes</h5>
          <ul>
          <li>${seg.indicativePrice.price + ' ' + seg.indicativePrice.currency}</li>
          {/*sName for stations || sCode for flights*/}
          <li>{seg.sName || seg.sCode} &#8594; {seg.tName || seg.tCode}</li>
          </ul>
        </div>
      )
    });
    return (
      <Panel header={route.name} eventKey={this.count++}>
        <h4>Duration (Travel & Transfer Time): {route.duration} minutes</h4>
        <h4>Total Price: ${route.indicativePrice.price + ' ' + route.indicativePrice.currency}</h4>
        {segs}
        <Button onClick={ () => { this.onRouteSelect(route) } }> Select </Button>
        {this.state.message}
      </Panel>
    );
  }

  onRouteSelect(route) {
    const coord = route.segments.map((segment)=>{
      if(!segment.tPos){
        return false
      }
      return { lat: segment.tPos.split(',')[0], lon: segment.tPos.split(',')[1] }
    })

    this.props.onSelect({segments:_.compact(coord)})
    this.setState({
      message:'  selected!'
    })
  }



  render() {
    this.count=0;

    console.log('test');
    console.log(this.props.data.routes);

    return (
      <div className="col-md-12">
      <Accordion>
        {this.props.data.routes.map(this.routeDisplay, this)}
      </Accordion>
      </div>
    )
  }
}
