import React, { PropTypes } from 'react'
export default function ChatInput (props) {
  return (
    <div>
    <form>
      <input type="text"/>
      <input type="submit" className='ghost-button'/>
    </form>
    </div>
  )
}