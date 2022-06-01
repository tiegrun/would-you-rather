import React, { Fragment } from 'react'
import {useEffect, useState} from "react";
import {mapStateToProps, mapDispatchToProps} from '../../Store/storeProps';
import {connect} from "react-redux";
import LeaderBoardUser from  "./LeaderBoardUser"

function LeaderBoardUserList({userList, getUserListAsync, chooseAnswerOrQuestion}) {

  const [leaderByAnswers, setLeaderByAnswers] = useState("Loading");
  const [leaderByQuestions, setLeaderByQuestions] = useState("Loading");

  useEffect(() => {
    
    if(typeof userList === "string"){
      getUserListAsync()
    } 
    else{
      const usersLeaderByAnswers = userList.map(us=>{
        return {
          ...us,
          answers: Object.keys(us.answers).length,
          questions: Object.keys(us.questions).length,
        }
      }).sort((a, b) => b.answers - a.answers)   
      
      const usersLeaderByQuestions = userList.map(us=>{
        return {
          ...us,
          answers: Object.keys(us.answers).length,
          questions: Object.keys(us.questions).length,
        }
      }).sort((a, b) => b.questions - a.questions)
      
      setLeaderByAnswers(usersLeaderByAnswers);
      setLeaderByQuestions(usersLeaderByQuestions)
    }
     
  }, [userList]);

  return (
    <Fragment>
      <div className='leaderList'>
        <ol>
          <LeaderBoardUser answersOrQuestions={chooseAnswerOrQuestion ? leaderByAnswers : leaderByQuestions}/>
        </ol>
      </div>
    </Fragment>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(LeaderBoardUserList);