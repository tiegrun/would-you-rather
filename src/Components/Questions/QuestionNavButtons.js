import React, {useState, useEffect, Fragment} from 'react';
import {mapStateToProps, mapDispatchToProps} from '../../Store/storeProps';
import {connect} from "react-redux";
import { useNavigate } from "react-router-dom";
import SelectedUserProfilePage from "../SelectUserComponent/SelectedUserProfilePage";

function QuestionNavButtons({loggedUser}) {

  const [loginAgain, setLoginAgain] = useState(true);

  const userIdByStorage = localStorage.getItem('userId');
  const userIdByRedux = loggedUser[0].id;

  useEffect(()=>{

    if(userIdByStorage === "" || userIdByRedux === undefined){

      setLoginAgain(true)

    }
    else{

      setLoginAgain(false)

    }

  },[localStorage.getItem('userId'), loggedUser])

  let navigate = useNavigate();

  const handleRoute = (e)=>{
    const path = e.target.name;

    navigate(path);
  }

  return (
    <div>
      {loginAgain
        ?
          <SelectedUserProfilePage />
        :
        <Fragment>
        <div className="btnSection">
        | <button className="simpleBtn" name={`/`} onClick={handleRoute}>
          Home
        </button> |
        <button className="simpleBtn" name={`/leaderboard`} onClick={handleRoute}>
          LeaderBoard
        </button> |
        <button className='simpleBtn' name={`/add`} onClick={handleRoute}>
          Create A New Poll
        </button> |
      </div>
      <SelectedUserProfilePage />
        </Fragment>
      
      }
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionNavButtons)
