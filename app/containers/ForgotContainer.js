import React, { Component } from 'react';

export default class ForgotContainer extends Component {
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
                Sign Up
              </button>

          </form>

        <SignUpMessage attempt={this.state.attempt} success={this.state.success}/>

      <button className="btn" onClick={this.props.onForgotClick}>Back</button>
      </div>
    );
  }
}
