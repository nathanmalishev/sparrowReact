import React, { Component } from 'react';
import { isAuth, signIn, AUTH_TOKEN } from '../helpers/auth';
import PasswordContainer from './PasswordContainer';

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
    };

    this.onLoginClick = this.onLoginClick.bind(this);
  }

  componentDidMount() {
    // check if user is logged in
    // then set state
    if (isAuth()) {
      this.setState({
        authenticated: true,
      });
    }
  }

  onLoginClick(username, password) {
    signIn(username, password)
      .then((res)=> {
        if(res.token){
          this.setState({
            authenticated: true
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

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={{ margin: 0 }}>Sparrow Travel</h2>

        </div>
        {
          this.state.authenticated === true
            ? this.props.children
            : <div>
              <PasswordContainer
                handleLoginClick={this.onLoginClick}/>
                {this.state.message}
              </div>
        }
      </div>
    );
  }
}

export default Main;
