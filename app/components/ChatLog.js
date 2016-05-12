import React, { PropTypes } from 'react'
export default function ChatLog ({messages}) {

  const messageList = messages.map((message)=>{
    return(
      <div>
        <p>{message.username} : {message.msg}</p>
      </div>
    )
  })
  return (
    <div>
      {messageList}
    </div>
  )
}