import React, { Component } from 'react';

export default class FlightSearchContainer extends Component {
  constructor() {
    super();
    this.state = {
      to: '',
      from: '',
    };
    this.handleToChange = this.handleToChange.bind(this)
    this.handleFromChange = this.handleFromChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleToChange(e){
    this.setState({ to: e.target.value });
  }
  handleFromChange(e){
    this.setState({ from: e.target.value });
  }
  handleSubmit(e){
    e.preventDefault();
    var to = this.state.to.trim();
    var from = this.state.from.trim();
    if( !to || !from){
      return;
    }
    this.props.handleFlightClick(to, from)
  }


  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
          <b> From </b>
            <input
              type="text"
              value={this.state.from}
              onChange={this.handleFromChange}
            />
            <b> To   </b>
            <input type="submit" value="Post" />
          </form>

      </div>
    );
  }
}
