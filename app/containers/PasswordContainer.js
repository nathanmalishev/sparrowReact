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
            
            <button className="btn btn-primary btn-block btn-lg btn-signin" type="submit" value="Post">Sign in</button>
            <button className="btn btn-danger btn-block btn-lg btn-signin" type="submit" value="Post">Sign up</button>
          
          </form>
          
          <a href="#" className="forgot-password">Forgot your password?</a>     
        </div>
      );
  }
}

/*
<body>
    <div class="container"><span class="reauth-email"> </span>
        <h1 class="text-nowrap text-center"> SPARROW </h1></div>
    <div class="login-card">
        <img src="avatar_2x.png" class="profile-img-card" />
        <p class="profile-name-card"> </p>
        <form class="form-signin"><span class="reauth-email"> </span>
            <input type="email" required placeholder="Email address" autofocus class="form-control" id="inputEmail" />
            <input type="password" required placeholder="Password" class="form-control" id="inputPassword" />
            <div class="checkbox">
                <div class="checkbox">
                    <label>
                        <input type="checkbox" />Remember me</label>
                </div>
            </div>
            <button class="btn btn-primary btn-block btn-lg btn-signin" type="submit">Sign in</button>
        </form><a href="#" class="forgot-password">Forgot your password?</a></div>
</body>
</html>

*/




PasswordContainer.propTypes = {
  handleLoginClick: PropTypes.func.isRequired,
};

export default PasswordContainer;
