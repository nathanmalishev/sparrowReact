import React, { PropTypes } from 'react'
import {Link} from 'react-router'


const styles = {
  container:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: 600,
    margin:'20px',
    // border: '2px solid black',
    // border-radius: '10px',
    // backgroundColor:'lightgrey'
  }
}


export default function Group ({_id,groupname, users,destinations}) {

  const destinationList = destinations.map((dest)=>{
    return dest.name.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) + ' '
  })
  const userList = users.map((user)=>{
    return user.username.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) + ' '
  })
  return (
    <Link to={'/group/'+_id} >
      <div style={styles.container}>
        <h2>{groupname}</h2>
        <p>{destinationList}</p>
        <p>{userList}</p>
      </div>
    </Link>
  )
}