import React, { PropTypes } from 'react'
import UserTab from './UserTab'




export default function ChatSideBar ({users, currentUser, ClickChangeUser}) {
  const userList = users.map((user)=>{
    return JSON.stringify(user) === JSON.stringify(currentUser)
      ? <UserTab key={user._id} onClick={ClickChangeUser} active='true'>{user}</UserTab>
      : <UserTab key={user._id} onClick={ClickChangeUser}>{user}</UserTab>
  })
  return (
    <div className="col-md-3">
      {userList}
    </div>
  )
}