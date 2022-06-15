import React, {Fragment, useEffect} from 'react';
import "../../Style/LeaderBoard.css";
import {useState} from "react";
import LeaderBoardUserList from "./LeaderBoardUserList";
import { useNavigate } from "react-router-dom";
import SelectedUserProfilePage from "../SelectUserComponent/SelectedUserProfilePage";

function Leaderboard({loggedUser}) {

  const [loginAgain, setLoginAgain] = useState(true);

  const userIdByStorage = localStorage.getItem('userId');
  const userIdByRedux = localStorage.getItem('userId');

  useEffect(()=>{

    if(userIdByStorage === "" || userIdByRedux === undefined){

      setLoginAgain(true)

    }
    else{

      setLoginAgain(false)

    }

  },[localStorage.getItem('userId'), loggedUser])

  let navigate = useNavigate();

  const toRoute = (e) =>{ 
    const path = e.target.name; 
    navigate(path);
  }

  const [btnHandler, setBtnHandler] = useState(true)

  const handleByAnswer = ()=>{
    setBtnHandler(true)
  }

  const handleByQuestion = ()=>{
    setBtnHandler(false)
  }

  return (
    <div className='Section LeaderBoard'>
      {loginAgain
        ?
          <SelectedUserProfilePage />
        :  
          <Fragment>
            <div className='pageHeader'>
              <h2>Leaderboard</h2>
            </div>   
            <div className='btnSection'>
              <button className='simpleBtn' onClick={toRoute} name={`/`}>Home</button> |
              <button className='simpleBtn' onClick={toRoute} name={`/add`}>Create A New Poll</button> |
              <button className={btnHandler ? 'simpleBtn simpleBtnActive' : 'simpleBtn'} onClick={handleByAnswer}>By Answers</button> |
              <button className={!btnHandler ? 'simpleBtn simpleBtnActive' : 'simpleBtn'} onClick={handleByQuestion}>By Questions</button>
            </div>
            <div className='LeadProfile'>
              <SelectedUserProfilePage />
              <div>
                <h2>Leader List</h2>
              </div>
              <LeaderBoardUserList chooseAnswerOrQuestion={btnHandler}/>
            </div>
          </Fragment>
      }
      
      
    </div>
  )
}

export default Leaderboard 
