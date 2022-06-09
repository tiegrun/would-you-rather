import React, { Fragment } from 'react';
import "../../Style/SelectUsers.css";
import {useEffect, useState} from "react";
import {mapStateToProps, mapDispatchToProps} from '../../Store/storeProps';
import {connect} from "react-redux";
import SelectUser from "./SelectUser";
import SelectedUserProfile from "./SelectedUserProfile";

function SelectUserList({userList, getUserListAsync, logInUserAsync, isLoggedAsync, loggedUser}) {
  
  const [users, setUsers] = useState("Loading");
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const selectedUserId = localStorage.getItem('userId');
  
  useEffect(() => {
    
    if(typeof userList === "string"){
      setUsers("Loading");
      getUserListAsync();
    } 
    else{

      setUsers(userList);
      
      const selectedUserProfile = userList.filter(user=>user.id===selectedUserId)
     
      if(selectedUserId !== "" && selectedUserId !== null){

        setUserLoggedIn(true);
        isLoggedAsync(true);
        logInUserAsync(selectedUserProfile);
          
      }
      else{

        setUserLoggedIn(false)

      }
    }
     
  }, [userList, localStorage.getItem('userId')]);

  const selectedUser = (clickedUser)=>{

    const userProfile = userList.filter(user=>user.id===clickedUser);

    localStorage.setItem('userId', userProfile[0].id);

    logInUserAsync(userProfile);
    
  }

  console.log(selectedUserId)

  return (
    
      <Fragment>
        {!userLoggedIn
          ? 
            <div className='Section UserRegistration'>
              <div className='pageHeader'>
                <h2>Select User</h2>
              </div> 
              <div className='subSection'>
              <div className='btnSection selectUsersLoading'>
                <SelectUser users={users} selectedUser={selectedUser}/>
              </div>
              </div>
            </div>
          : 
            <SelectedUserProfile />
        } 
      </Fragment>  
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectUserList)