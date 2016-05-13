import React, { PropTypes } from 'react'

const styles = {
  chatinp:{
    float:'left',
    width:'100%',
  }
}

export default function ChatInput (props) {
  return (
    <div>
    <form>
      <input type="text" autofocus className="sparrow-form-control" style={styles.chatinp}/>
      <input type="submit" className='send-ghost-button' value='Send'/>
    </form>
    </div>
  )
}