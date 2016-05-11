import React, { PropTypes } from 'react'


const styles = {
  active:{
    backgroundColor:'#4aa3df',
  }
}

export default function UserTab ({children, onClick, active}) {
  if(active === 'true'){
      return (
        <div onClick={onClick.bind(null,children)}>
        <p style={styles.active}>
          {children.username}
        </p>
        </div>
    )
  }
  return (
    <div onClick={onClick.bind(null,children)}>
    <p>
      {children.username}
    </p>
    </div>
  )
}