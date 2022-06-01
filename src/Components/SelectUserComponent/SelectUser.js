import React, { Fragment } from 'react';

function SelectUser({users, selectedUser}) {

  const getSelectedUser = (e)=>{
    
    const clickeduser = e.target.innerText.replace(/[\W\d_]/g, '').toLowerCase()
    selectedUser(clickeduser)
    
  }

  return (
    <Fragment>
      {users!=="Loading" 
          ? users.map((user, index)=>{
            return <button className='simpleBtn selectUserBtn' key={index} onClick={getSelectedUser}>
                   | {user.name} |
                  </button> 
              }
            )
          : "... Loading"}
    </Fragment>
  )
}

export default SelectUser