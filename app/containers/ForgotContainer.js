import React, { Component } from 'react';
import {forgotPassword} from '../helpers/auth'

function SignUpMessage({attempt,success}){
  function message(){
    if(attempt === true){
      if(success === true){
        return <p>Succesfully changed password</p>
      }else
      {
        return <p>Please enter a correct username/email</p>
      }
    }
  }
  return <div>{message()}</div>
}

export default class ForgotContainer extends Component {
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
    const {username, email, password} = this.state
    if(!username || !email || !password){
      this.setState({attempt:true})
      return
    }
    forgotPassword(username, email, password)
      .then((res)=>{
        if(res.status === 200){
          this.setState({
            attempt:true,
            success:true
          })
        }else{
          this.setState({
            attempt:true,
            success:false
          })
        }
      })
      .catch((err)=>{
        console.log(err)
      })
  }


  render() {
    return (
      <div>
        <h2>Reset your password!</h2>
        <form className="form-signin" onSubmit={this.handleSubmit}>
            Username
            <input
              type="text"
              placeholder="Username"
              autofocus className="form-control"
              value={this.state.username}
              onChange={this.handleUserChange}
            />
             <div className="divider" />
            Email
            <input
              type="email"
              placeholder="email"
              className="form-control"
              value={this.state.email}
              onChange={this.handleEmailChange}
            />

            <div className="divider" />
            New Password
            <input
              type="text"
              placeholder="Password"
              className="form-control"
              value={this.state.password}
              onChange={this.handlePassChange}
            />
              <button className="btn btn-danger btn-block btn-lg btn-signup"
                    type="submit" value="Post">
                Reset password
              </button>

          </form>

        <SignUpMessage attempt={this.state.attempt} success={this.state.success}/>
      <button className="btn" onClick={this.props.onForgotClick}>Back</button>
      </div>
    );
  }
}
