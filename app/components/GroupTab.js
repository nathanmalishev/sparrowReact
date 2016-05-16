import React, { PropTypes } from 'react'
import {Link} from 'react-router'


const styles = {
  container:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: 1000,
    color: 'black',
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
    <Link to={'/group/'+_id}>
      <div style={styles.container}>
        <h2>{groupname}</h2>
        <p>{destinationList}</p>
        <p>{userList}</p>
        <br/>
        <hr width='1000px' height='1px' background='black' />
      </div>
    </Link>
  )
}
