import React, { PropTypes } from 'react'


//renders just the chat log and messages
export default function ChatLog ({messages, authUser}) {
  console.log('messages', messages)
  const messageList = messages.map((message)=>{
    if(message.username === authUser.username){
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
    <div className="chat-log">
      {messageList}
    </div>
  )
}