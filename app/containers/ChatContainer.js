import React, { Component } from 'react';
import ChatSideBar from '../components/ChatSideBar'
import ChatLog from '../components/ChatLog'
import ChatInput from '../components/ChatInput'

import PUBNUB from 'pubnub'


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

    const pubnubCONN = PUBNUB.init({
      publish_key: 'pub-c-ceb946c9-cf37-48de-9420-c9722c4053ff',
      subscribe_key: 'sub-c-d3f93cd2-1733-11e6-b700-0619f8945a4f'
    })

    pubnubCONN.channel_group_add_channel({
        channel: this.props.params.id,
        channel_group: 'energy'
    });

    pubnubCONN.subscribe({
      channel_group: 'energy'
    })

    this.setState({
      currentUser: this.props.users[0],
      isLoading: false
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
        <div className="col-md-3">
        <ChatSideBar
          users={_.concat(this.props.users, {username:'Group',_id:'0'})}
          currentUser={this.state.currentUser}
          ClickChangeUser={this.handleChangeUser.bind(this)}
        />
        </div>
        <div className="col-md-9">
          {
            this.state.isLoading === true
            ? <p>Loading..</p>
            : <ChatLog messages={[{username:'nathan',msg:'apple'}]}/>
          }
          <ChatInput/>
        </div>

        <p onClick={this.test}>Apple</p>
      </div>
    );
  }
}
