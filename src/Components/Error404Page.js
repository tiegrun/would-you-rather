import React from 'react';
import { useNavigate } from "react-router-dom";

function Error404Page() {

  let navigate = useNavigate();

  const toRoute = (e)=>{
    const path = e.target.name;

    navigate(path);
  }

  return (
    <div className='Section LeaderBoard'>
      <div className='pageHeader'>
        <h2>This page does not exist</h2>
      </div>   
      <div className='btnSection'> |
        <button className='simpleBtn' onClick={toRoute} name={`/`}>Home</button> |
      </div>
      <div className='subSection'>
        <div className="profileQuestionList">
          <h1 className='err404'>Error 404</h1>
        </div>
      </div>
    </div>
  )
}

export default Error404Page