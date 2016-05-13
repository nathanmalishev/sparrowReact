import React, { PropTypes } from 'react'

export default function ChatLog ({messages}) {

  const messageList = messages.map((message)=>{
    return(
      <div className="chat-message">
        <p className="chat-user">{message.username} :</p><p className="chat-message-text"> {message.msg}</p>
      </div>
    )
  })
  return (
    <div className="chat-log">
      {messageList}
    </div>
  )
}