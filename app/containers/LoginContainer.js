import React, { Component } from 'react';
import { isAuth, signIn, AUTH_TOKEN, logout } from '../helpers/auth';
import PasswordContainer from './PasswordContainer';
import {Link} from 'react-router'
import SignUpContainer from './SignUpContainer'
import ForgotContainer from './ForgotContainer'

const styles = {
  container: {
    width: '100%',
    height: '92%',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'rgba(252, 90, 44, 0.89)',
    color: '#fff',
    padding: 5,
  },
};

class Main extends Component{
  constructor() {
    super();
    this.state = {
      authenticated: false,
      message: '',
      signUp:false,
      forgot:false
    };

    this.onLoginClick = this.onLoginClick.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleForgot = this.handleForgot.bind(this);
  }

  componentDidMount() {
    // check if user is logged in
    // then set state
    if (isAuth()) {
      this.setState({
        authenticated: true,
        signUp:false,
        forgot:false
      });
    }
  }

  onLoginClick(username, password) {
    signIn(username, password)
      .then((res)=> {
        if(res.token){
          this.setState({
            authenticated: true,
            signUp:false,
            forgot:false
          });
          return
        }else{
          this.setState({
            authenticated: false,
            message: res.data.message
          });
        }
      })
      .catch((res)=>{

      })
  }

  handleGoogleClick(){
    console.log('google click')
  }

  handleSignUp(){
    this.setState({
      signUp: !this.state.signUp
    })
  }
  handleForgot(){
    this.setState({
      forgot: !this.state.forgot
    })

  }


  render() {
    const displayPage = ()=>{
      if(this.state.authenticated === true){
        return this.props.children
      }else{
        if(this.state.signUp === true){
          return <SignUpContainer onSignUpClick={this.handleSignUp}/>
        }else if(this.state.forgot === true){
          return <ForgotContainer onForgotClick={this.handleForgot}/>
        }else{
          return(<div>
                <PasswordContainer
                  handleLoginClick={this.onLoginClick}
                  onGoogleClick={this.handleGoogleClick}
                  onSignUpClick={this.handleSignUp}
                  onForgotClick={this.handleForgot}
                />
                {this.state.message}
                </div>)
        }
      }
    }
    return (
      // <div style={styles.container}>
        // <div style={styles.header}>
      <div className="container">
          <h2 className="text-nowrap text-center">Sparrow Travel</h2>
          {
            this.state.authenticated === true
            ? <p onClick={logout}>Logout</p>
            : <p></p>
          }
        {displayPage()}
      </div>
    );
  }
}

export default Main;
