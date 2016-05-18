import React, { PropTypes, Component } from 'react'


//renders just the chat log and messages
export default class ChatLog extends Component{

  componentDidUpdate(){
    var elem = document.getElementById('aaChat');
    elem.scrollTop = elem.scrollHeight;
  }

  render(){
    const messageList = this.props.messages.map((message)=>{
      if(message.username === this.props.authUser.username){
        return(
          <div className="chat-message">
            <p className="chat-user">{message.username} :</p><p className="chat-message-text"> {message.msg}</p>
          </div>
        )
      }else{
        return(
          <div className="chat-message-other">
            <p className="chat-user">{message.username} :</p><p className="chat-message-text"> {message.msg}</p>
          </div>
        )
      }
    })
    return (
      <div className="chat-log" id="aaChat">
        {messageList}
      </div>
    )
  }
}