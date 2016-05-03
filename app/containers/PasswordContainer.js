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
              autofocus className="form-control"
              value={this.state.username}
              onChange={this.handleUserChange}
            />

            <div className="divider" />

            <input
              type="password"
              placeholder="Password = test"
              className="form-control"
              value={this.state.password}
              onChange={this.handlePassChange}
            />
            <div className="divider" />
            <button className="btn btn-primary btn-block btn-lg btn-signin"
                    type="submit" value="Post">Sign In</button>
            <Link to="signup" onClick={this.props.onSignUpClick}>
              <button className="btn btn-danger btn-block btn-lg btn-signup"
                    type="submit" value="Post">
                Sign Up
              </button>
            </Link>

            <a className="btn btn-block btn-social btn-facebook">
              <span className="fa fa-facebook"></span>
              Sign in with Facebook
            </a>
            <a className="btn btn-block btn-social btn-google">
              <span className="fa fa-google"></span>
              Sign in with Google
            </a>

          </form>

          <br/>

          <Link to="forgot" className="forgot-password" onClick={this.props.onForgotClick}>
            Forgot your password?
          </Link>
        </div>
      );
  }
}

PasswordContainer.propTypes = {
  handleLoginClick: PropTypes.func.isRequired,
};

export default PasswordContainer;
