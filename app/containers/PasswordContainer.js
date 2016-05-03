import React, { Component, PropTypes } from 'react';
import GoogleLogin from '../components/GoogleLogin';
import {Link} from 'react-router'

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
        <div className="login-card">
          <form className="form-signin" onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="Username = nathan"
              autofocus className="sparrow-form-control"
              value={this.state.username}
              onChange={this.handleUserChange}
            />

            <div className="divider" />

            <input
              type="password"
              placeholder="Password = test"
              className="sparrow-form-control"
              value={this.state.password}
              onChange={this.handlePassChange}
            />
            <div className="divider" />
            <button className="ghost-button" type="submit" value="Post" transform="uppercase">
            SIGN IN
            </button>
                       
            <button className="ghost-button" type="submit" value="Post" to="signup" onClick={this.props.onSignUpClick}>
            SIGN UP
            </button>
            
            <button className="ghost-button">
              <span className="fa fa-facebook"></span>
            </button>
            
            <button className="ghost-button">
              <span className="fa fa-google"></span>
            </button>
            
          </form>

          <br/>

          <a to="forgot" className="forgot-password" onClick={this.props.onForgotClick}>
            Forgot your password?
          </a>
        </div>
      );
  }
}

PasswordContainer.propTypes = {
  handleLoginClick: PropTypes.func.isRequired,
};

export default PasswordContainer;
