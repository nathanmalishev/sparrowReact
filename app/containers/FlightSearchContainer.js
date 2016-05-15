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
            Enter to
            <input
              type="text"
              value={this.state.to}
              onChange={this.handleToChange}
            />
            Enter from
            <input
              type="text"
              value={this.state.from}
              onChange={this.handleFromChange}
            />

            <input type="submit" value="Post" />
          </form>

      </div>
    );
  }
}