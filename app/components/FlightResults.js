import React, { Component } from 'react'
import {Accordion, Panel, Button} from 'react-bootstrap'
import {addRoute} from '../helpers/api'
import _ from 'lodash'


export default class FlightResults extends Component {

  constructor() {
    super();
    this.state = {
      message:''
    }
  }

  routeDisplay(route) {
    var segs = route.segments.map(function(seg) {
      return <li>{seg.kind}</li>;
    });
    return (
      <Panel header={route.name} eventKey={this.count++}>
        <p> Duration : {route.duration} minutes, Price: ${route.indicativePrice.price} </p>
        <ul>{segs}</ul>
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
    return (
      <div className="col-md-12">
      <Accordion>
      {this.props.data.routes.map(this.routeDisplay, this)}

      </Accordion>
      </div>
    )
  }
}
