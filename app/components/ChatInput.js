import React, { PropTypes } from 'react'
export default function ChatInput (props) {
  return (
    <div>
    <form>
      <input type="text" autofocus className="sparrow-form-control"/>
      <input type="submit" className='small-ghost-button' value='Send'/>
    </form>
    </div>
  )
}