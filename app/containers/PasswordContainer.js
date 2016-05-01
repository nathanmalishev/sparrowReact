import React, { Component, PropTypes } from 'react';

class PasswordContainer extends Component{

  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
    this.handleUserChange = this.handleUserChange.bind(this)
    this.handlePassChange = this.handlePassChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleUserChange(e){
    this.setState({ username: e.target.value });
  }
  handlePassChange(e){
    this.setState({ password: e.target.value });
  }
  handleSubmit(e){
    e.preventDefault();
    var username = this.state.username.trim();
    var password = this.state.password.trim();
    if( !username || !password){
      return;
    }
    this.props.handleLoginClick(username, password)
  }

  render() {
    return (
        <div>
        username: nathan
        password: test
          <form onSubmit={this.handleSubmit}>
            Enter Username
            <input
              type="text"
              value={this.state.username}
              onChange={this.handleUserChange}
            />
            Enter Password
            <input
              type="text"
              value={this.state.password}
              onChange={this.handlePassChange}
            />

            <input type="submit" value="Post" />
          </form>
        </div>
      );
  }
}

PasswordContainer.propTypes = {
  handleLoginClick: PropTypes.func.isRequired,
};

export default PasswordContainer;
