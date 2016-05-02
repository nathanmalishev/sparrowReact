import React, { PropTypes } from 'react'
export default function FlightResults ({to, from, data}) {
  return (
    <div>
      <p>Flight resulsts</p>
      <p>To: {to}</p>
      <p>From: {from}</p>
      <p>Data: {JSON.stringify(data.agencies)}</p>
    </div>
  )
}