import React, { PropTypes } from 'react'
import {Link} from 'react-router'


const styles = {
  container:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 300,
    margin:'20px',
    alignSelf: 'right',
    backgroundColor:'lightgrey'
  }
}


export default function Group ({_id,groupname, users,destinations}) {
  return (
    <Link to={'/group/'+_id} >
      <div style={styles.container}>
        <p>Name: {groupname}</p>
        <p>Destinations: {destinations.length}</p>
        <p>Users: {users.length}</p>
      </div>
    </Link>
  )
}