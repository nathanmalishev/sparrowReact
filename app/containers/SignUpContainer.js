import React, { Component } from 'react';
import { Link } from 'react-router';
import { signUp } from '../helpers/auth';

function SignUpMessage({attempt,success}){
  function message(){
    if(attempt === true){
      if(success === true){
        return <p>Succesfully registered!</p>
      }else
      {
        return <p>Failed try another username!</p>
      }
    }
  }
  return <div>{message()}</div>
}


export default class SignUpContainer extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      email: '',
      attempt:false,
      success:false,
    };
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUserChange(e) {
    this.setState({
      username: e.target.value,
    });
  }

  handleEmailChange(e) {
    this.setState({
      email: e.target.value,
    });
  }

  handlePassChange(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if(!this.state.username || !this.state.email || !this.state.password){
      this.setState({attempt:true})
      return
    }
    signUp(this.state.username,this.state.email,this.state.password)
      .then((res)=>{
        if(res.data.success === true){
          this.setState({
            username: '',
            password: '',
            email: '',
            attempt: true,
            success: true
          })
          location.href = location.origin;
        }else{
          this.setState({
            attempt: true,
            success: false
          })
        }
      })
  }

  render() {
    return (
      <div className="login-card">
          <form className="form-signin" onSubmit={this.handleSubmit}>
            <h2 className="text-nowrap text-center">Sign Up</h2><hr/>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="First Name" required/>
            </div>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Last Name" required/>
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                value={this.state.username}
                onChange={this.handleUserChange}
                id="username"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Email Address"
                value={this.state.email}
                onChange={this.handleEmailChange}
                id="email"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handlePassChange}
                id="password"
                required
              />
            </div>
            <div className="checkbox">
              <label>
                <input type="checkbox" required/>I&#39;ve read and accept the terms and conditions
              </label>
            </div>
            <button className="ghost-button" type="submit" value="Post">SIGN UP</button>
            <button className="ghost-button" onClick={this.props.onSignUpClick}>CANCEL</button>
          </form>

          <SignUpMessage attempt={this.state.attempt} success={this.state.success}/>

      </div>
    );
  }
}
