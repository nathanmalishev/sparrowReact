import React, { PropTypes } from 'react'

const styles = {
  log:{
    border:'1px solid #ccc',
    overflow:'auto',
    height:'400px',
    backgroundColor:'#F7F7F7',
  }
}

export default function ChatLog ({messages}) {

  const messageList = messages.map((message)=>{
    return(
      <div style={styles.log}>
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