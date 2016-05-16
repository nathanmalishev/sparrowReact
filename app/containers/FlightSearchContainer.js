import React, { Component } from 'react';


const styles = {
  button: {
    marginTop:'30px',
    marginBottom:'20px'
  }
}

//Flight Search Container handles the user inputs and calls
//the function passed in as prop
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
      <form onSubmit={this.handleSubmit}
        className="form-signin col-md-6 col-md-offset-3 text-center"
        >
            <h3>from</h3>
            <input
              type="text"
              placeholder="Melbourne"
              className="sparrow-form-control"
              value={this.state.from}
              onChange={this.handleFromChange}
            />
            <h3>to</h3>
            <input
              type="text"
              placeholder="Paris"
              value={this.state.to}
              className="sparrow-form-control"
              onChange={this.handleToChange}
            />

            <input type="submit" value="GO" className="ghost-button"
              style={styles.button}/>
          </form>
      </div>
    );
  }
}
