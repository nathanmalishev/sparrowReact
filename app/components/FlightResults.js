import React, { Component } from 'react'
import {Accordion, Panel, Button} from 'react-bootstrap'
import {addRoute} from '../helpers/api'
import _ from 'lodash'

//Renders flight results data passed to it
export default class FlightResults extends Component {

  constructor() {
    super();
    this.state = {
      selectVal: 'SELECT'
    }
  }

  routeDisplay(route) {
    var segs = route.segments.map(function(seg) {
      return (
        <div className="text-left">
          <ul>
            <h5>LEG {route.segments.indexOf(seg) + 1}<strong> {seg.kind.toUpperCase()}</strong> - {seg.duration + seg.transferDuration} minutes</h5>
            <h6>&#8226; ${seg.indicativePrice.price + ' ' + seg.indicativePrice.currency}</h6>
            {/*sName for stations || sCode for flights*/}
            <h6>&#8226; {seg.sName || seg.sCode} &#8594; {seg.tName || seg.tCode}</h6>
          </ul>
        </div>
      )
    });
    return (
      <Panel header={route.name} eventKey={this.count++}>
        <h4 className="text-left">Duration (Travel & Transfer Time): {route.duration} minutes</h4>
        <h4 className="text-left">Total Price: ${route.indicativePrice.price + ' ' + route.indicativePrice.currency}</h4>
        {segs}
        <input type="submit" className="ghost-button" onClick={ () => { this.onRouteSelect(route) } } value={this.state.selectVal}/>
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
      selectVal:'SELECTED'
    })
  }

  render() {
    this.count=0;

    return (
      <div className="col-md-12">
      <Accordion className="text-nowrap text-center">
        {this.props.data.routes.map(this.routeDisplay, this)}
      </Accordion>
      </div>
    )
  }
}
