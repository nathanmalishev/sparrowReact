import React, { Component } from 'react'
import {Accordion, Panel, Button} from 'react-bootstrap'
import {addRoute} from '../helpers/api'


export default class FlightResults extends Component {

  constructor() {
    super();
  }

  routeDisplay(route) {
    console.log(route)
    var segs = route.segments.map(function(seg) {
      return <li>{seg.kind}</li>;
    });
    return (
      <Panel header={route.name} eventKey={this.count++}>
        <p> Duration : {route.duration} minutes, Price: ${route.indicativePrice.price} </p>
        <ul>{segs}</ul>
        <Button onClick={ () => { this.onRouteSelect(route) } }> Select </Button>
      </Panel>
    );
  }

  onRouteSelect(route) {
    addRoute(this.props.groupId, route)
      .then((res)=> {
        console.log(res);
      })
      .catch((err)=> {
        console.log(err);
      });
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
