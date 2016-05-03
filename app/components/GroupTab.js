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

  const destinationList = destinations.map((dest)=>{
    return dest.name.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) + ' '
  })
  const userList = users.map((user)=>{
    console.log(user)
    return user.username.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) + ' '
  })
  return (
    <Link to={'/group/'+_id} >
      <div style={styles.container}>
        <p>Name: {groupname}</p>
        <p>Destinations: {destinations.length}</p>
        <p>{destinationList}</p>
        <p>Users: {users.length}</p>
        <p>{userList}</p>
      </div>
    </Link>
  )
}