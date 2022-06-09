import React, { Fragment } from 'react';
import {mapStateToProps, mapDispatchToProps} from '../../Store/storeProps';
import {connect} from "react-redux";
import { useNavigate } from "react-router-dom";
import SelectUserList from './SelectUserList';

function SelectedUserProfilePage({logInUserAsync, loggedUser}) {

  const navigate = useNavigate();

  const toRoute = (e) =>{

    const path = "/"

    navigate(path);
  }

  const handleLogOut =(e)=>{

    localStorage.setItem('userId', '');
    localStorage.setItem('answered', '');
    localStorage.setItem('unanswered', '');
    localStorage.setItem('answertype', '');

    logInUserAsync([]);
    
    return toRoute(e);

  }

  return (
    <Fragment>
        {loggedUser==="No User" 
          ? 
            <SelectUserList />
          :
            <ul className='selectedUserProfile'>
              {loggedUser.map(user=>
                <li key={user.id} className="subSection">
                  <div className='profile'>
                    <div className='imagePlace'>
                      <img src={user.avatarURL} alt="avatar" />
                    </div>
                    <div className='selectedUserDescription'>
                      <div className='profileInfo selectedUserInfo'>
                        <p>
                          <b>Logged User Profile<br></br><br></br>
                            Name :</b>
                          <span className='profileDetails'>
                            {user.name}
                          </span>
                        </p> 
                      </div>
                      <button className='simpleBtn logOutBtn' onClick={handleLogOut}>
                        Exit
                      </button>
                    </div>
                  </div>
                </li>
              )}
            </ul>
        }
    </Fragment>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedUserProfilePage)