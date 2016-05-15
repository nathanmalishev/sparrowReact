import React, { PropTypes } from 'react'

export default function UserTab ({children, onClick, active}) {
  if(active === 'true'){
      return (
        <div onClick={onClick.bind(null,children)}>
        <p className="chat-active">
          {children.username}
        </p>
        </div>
    )
  }
  return (
    <div onClick={onClick.bind(null,children)}>
    <p className="chat-inactive">
      {children.username}
    </p>
    </div>
  )
}