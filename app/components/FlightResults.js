import React, { Component } from 'react'

import {Accordion, Panel, Button, Tab, Nav, Row, Col, NavItem} from 'react-bootstrap'

import {addRoute} from '../helpers/api'

export default class FlightResults extends React.Component {

  constructor(props) {
    super(props);

    this.count = 0;
    this.count2 = 0;
    console.log(props, "res props")
  }

  routeDisplay(route) {
    this.count2 = 0;
    return (
      <Tab.Pane eventKey={this.count++}>
      <div>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row className="clearfix">
          <Col sm={4}>
            <Nav bsStyle="pills" stacked>
              {route.segments.map(this.segDisplayTab, this)}
            </Nav>
          </Col>
          <Col sm={8}>
            <Tab.Content animation>
              {this.count2 = 0, route.segments.map(this.segDisplay, this)}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
      </div>
      </Tab.Pane>
    )
  }

  segDisplayTab(seg) {
    return (
    <NavItem eventKey={this.count2++}>
      <b>{seg.kind}</b> Duration: {seg.duration}
    </NavItem>
    );
  }
  segDisplay(seg) {
      <Tab.Pane eventKey={this.count2++}>
      <div>
      <p>{seg.itineraries.length}</p>
      </div>
      </Tab.Pane>
  }

  routeDisplayTab(route) {
    return (
    <NavItem eventKey={this.count++}>
      <b>{route.name}</b> Duration: {route.duration}
    </NavItem>
    );
  }

  onRouteSelect(route) {
    addRoute(this.props.groupId, this.props.userId, route).then((res)=> {
      console.log(res);
    })
    .catch((err)=> {
      console.log(err);
    });
  }

  render() {
    this.count=0;
    return (
      <div>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row className="clearfix">
          <Col sm={4}>
            <Nav bsStyle="pills" stacked>
              {this.props.data.routes.map(this.routeDisplayTab, this)}
            </Nav>
          </Col>
          <Col sm={8}>
            <Tab.Content animation>
              {this.count =0, this.props.data.routes.map(this.routeDisplay, this)}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
      </div>
    );
  }
}
