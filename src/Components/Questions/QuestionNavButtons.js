import React from 'react';
import { useNavigate } from "react-router-dom";

function QuestionNavButtons() {

  let navigate = useNavigate();

  const handleRoute = (e)=>{
    const path = e.target.name;

    navigate(path);
  }

  return (
    <div className="btnSection">
      | <button className="simpleBtn" name={`/`} onClick={handleRoute}>
        Home
      </button> |
      <button className="simpleBtn" name={`/leaderboard`} onClick={handleRoute}>
        LeaderBoard
      </button> |
    </div>
  )
}

export default QuestionNavButtons