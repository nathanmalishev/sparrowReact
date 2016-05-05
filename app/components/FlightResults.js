import React, { Component } from 'react'
import {Accordion, Panel} from 'react-bootstrap'
export default class FlightResults extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    var count = 0;
    return (
      <Accordion>
      <br/>
      {this.props.data.routes.map(function(route) {

        var segs = route.segments.map(function(seg) {
          return <li>{seg.kind}</li>;
        });
        return (
          <Panel header={route.name} eventKey={count++}>
            <p> Duration : {route.duration} minutes, Price: ${route.indicativePrice.price} </p>
            <ul>{segs}</ul>
          </Panel>
        );
      })
      }
      </Accordion>
    )
  }
}
