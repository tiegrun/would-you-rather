import React from 'react';
import "../../Style/LeaderBoard.css";
import {useState} from "react";
import LeaderBoardUserList from "./LeaderBoardUserList";
import { useNavigate } from "react-router-dom";

function Leaderboard() {

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
      <div className='pageHeader'>
        <h2>Leaderboard</h2>
      </div>   
      <div className='btnSection'>
        <button className='simpleBtn' onClick={toRoute} name={`/`}>Home</button> |
        <button className={btnHandler ? 'simpleBtn simpleBtnActive' : 'simpleBtn'} onClick={handleByAnswer}>By Answers</button> |
        <button className={!btnHandler ? 'simpleBtn simpleBtnActive' : 'simpleBtn'} onClick={handleByQuestion}>By Questions</button>
      </div>
      <LeaderBoardUserList chooseAnswerOrQuestion={btnHandler}/>
    </div>
  )
}

export default Leaderboard 
