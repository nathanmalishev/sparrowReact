import React, { Component } from 'react';
import ChatSideBar from '../components/chatSideBar'
import ChatLog from '../components/ChatLog'
import ChatInput from '../components/ChatInput'
import {postChat} from '../helpers/api'

import PUBNUB from 'pubnub'


export default class ChatContainer extends Component {

  constructor(){
    super();
    this.state = {
      isLoading: true,
      messageLog: { global:[] },
      currentUser: {},
      pubnubCONN :PUBNUB.init({
        publish_key: 'pub-c-ceb946c9-cf37-48de-9420-c9722c4053ff',
        subscribe_key: 'sub-c-d3f93cd2-1733-11e6-b700-0619f8945a4f'
      })
    }
  }

  componentDidMount(){

    // const pubnubCONN = PUBNUB.init({
    //   publish_key: 'pub-c-ceb946c9-cf37-48de-9420-c9722c4053ff',
    //   subscribe_key: 'sub-c-d3f93cd2-1733-11e6-b700-0619f8945a4f'
    // })
    this.state.pubnubCONN.channel_group_add_channel({
        channel: this.props.params.id,
        channel_group: 'global'
    });

    this.state.pubnubCONN.subscribe({
      channel_group: 'global',
      callback:(m)=>{
        this.state.messageLog.global.push(m)
        this.setState({
          messageLog: this.state.messageLog
        })

        postChat(this.props.params.id, m)
          .then((res)=>{
            console.log(res)
          })
      }
    })
    this.setState({
      currentUser: {username:'Group',_id:'0'},
      messageLog: {global:this.props.chat},
      isLoading: false
    })
  }

  handleChangeUser(user){
    this.setState({
      currentUser: user
    })
  }


  handleSubmit(message){
    this.state.pubnubCONN.publish({
      channel:this.props.params.id,
      message:{username:this.props.authUser.username,msg:message},
      callback:function(m){
        console.log('sent', m)
      }
    })


  }
  render() {


    /* add if using multiple users*/
    function createSideBarUsers(users,authUser){
      users = _.concat(users, {username:'Group',_id:'0'})
      users = _.remove(users, function(e){
        return e._id !== authUser._id
      })
      return users
    }

    return (
      <div>
        <div className="col-md-3">
        <ChatSideBar
          users={[{username:'Group',_id:'0'}]}
          currentUser={this.state.currentUser}
          ClickChangeUser={this.handleChangeUser.bind(this)}
        />
        </div>
        <div className="col-md-9">
          {
            this.state.isLoading === true
            ? <p>Loading..</p>
            : <ChatLog messages={this.state.messageLog.global} authUser={this.props.authUser}/>
          }
          <ChatInput onSubmit={this.handleSubmit.bind(this)}/>
        </div>

      </div>
    );
  }
}
