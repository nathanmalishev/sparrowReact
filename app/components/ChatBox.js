import React, { PropTypes } from 'react'
export default function ChatBox ({isLoading}) {
  return (
    <div className="col-md-9">
      {
        isLoading === true
        ? <p>Loading..</p>
        : <p>Chat log</p>
      }
    </div>
  )
}