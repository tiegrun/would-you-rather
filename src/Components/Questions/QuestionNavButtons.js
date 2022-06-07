import React from 'react';
import { useNavigate } from "react-router-dom";
import SelectedUserProfilePage from "../SelectUserComponent/SelectedUserProfilePage";

function QuestionNavButtons() {

  let navigate = useNavigate();

  const handleRoute = (e)=>{
    const path = e.target.name;

    navigate(path);
  }

  return (
    <div>
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
    </div>
  )
}

export default QuestionNavButtons