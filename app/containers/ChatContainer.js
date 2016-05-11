import React, { Component } from 'react';
import ChatSideBar from '../components/ChatSideBar'
import ChatBox from '../components/ChatBox'


export default class ChatContainer extends Component {

  constructor(){
    super();
    this.state = {
      isLoading: true,
      messageLog: {},
      currentUser: {}
    }
  }

  componentDidMount(){
    this.setState({
      currentUser: this.props.users[0]
    })
  }

  handleChangeUser(user){
    console.log(user)
    console.log('click')
    this.setState({
      currentUser: user
    })

  }

  render() {
    return (
      <div>

        <ChatSideBar
          users={_.concat(this.props.users, {username:'Group',_id:'0'})}
          currentUser={this.state.currentUser}
          ClickChangeUser={this.handleChangeUser.bind(this)}
        />
        <ChatBox
          isLoading={this.state.isLoading}

        />
      </div>
    );
  }
}
