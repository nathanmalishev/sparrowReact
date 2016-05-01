import React, { PropTypes } from 'react'
import {Link} from 'react-router'

export default function Group ({_id,groupname, users}) {
  return (
    <Link to={'/group/'+_id}>
    <div style={{backgroundColor:'grey'}}>
      <p>Name: {groupname}</p>
      <p>Users: {users.length}</p>
    </div>
    </Link>
  )
}