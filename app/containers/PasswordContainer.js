import React, { Component, PropTypes } from 'react';
import GoogleLogin from '../components/GoogleLogin';

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
              type="text"
              placeholder="Password = test"
              className="form-control"
              value={this.state.password}
              onChange={this.handlePassChange}
            />

            <div className="checkbox">
              <label>
                <input type="checkbox" />Remember me</label>
            </div>

            <button className="btn btn-primary btn-block btn-lg btn-signin" type="submit" value="Post">Sign In</button>
            <button className="btn btn-danger btn-block btn-lg btn-signup" type="submit" value="Post">Sign Up</button>
            <GoogleLogin
              clientId="203362078403-i81c1cqnqihh3n5pf343eogs7e17t3rg.apps.googleusercontent.com"
              buttonText="Login with google"
              callback={this.props.onGoogleClick}
            />


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

          <a href="#" className="forgot-password">Forgot your password?</a>
        </div>
      );
  }
}

PasswordContainer.propTypes = {
  handleLoginClick: PropTypes.func.isRequired,
};

export default PasswordContainer;
