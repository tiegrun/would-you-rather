import React, {useState, useEffect} from 'react'
import {mapStateToProps, mapDispatchToProps} from '../../Store/storeProps';
import {connect} from "react-redux";
import ProfileQuestionList from "../Questions/ProfileQuestionList";
import { useNavigate } from "react-router-dom";
import SelectedUserProfilePage from "./SelectedUserProfilePage";

function SelectedUserProfile({getUserAnswerQuestionTypeAsync, userAnswerQuestionType}) {

  const [loadAnswered, setLoadAnswered] = useState(false);
  const getAnswerTypeSLocalStorage = localStorage.getItem('answertype');

  useEffect(()=>{

    if(userAnswerQuestionType!=="answered"){
      
      if(loadAnswered && getAnswerTypeSLocalStorage==="answered"){

        localStorage.setItem('answertype', 'answered');
        getUserAnswerQuestionTypeAsync("answered");

      }
    }
    else{

      if(loadAnswered && getAnswerTypeSLocalStorage==="answered"){

        localStorage.setItem('answertype', 'answered');
        getUserAnswerQuestionTypeAsync("answered");

      }
      else{

        localStorage.setItem('answertype', 'unanswered');
        getUserAnswerQuestionTypeAsync("unanswered");

      }
    }
    
  },[localStorage.getItem('answertype'), userAnswerQuestionType])

  // console.log(loadAnswered, userAnswerQuestionType, getAnswerTypeSLocalStorage);

  const navigate = useNavigate();

  const toRoute = (e) =>{

    const path = e.target.name;

    navigate(path);
  }

  const handlerQuestions = (e)=>{

    const btnName = e.target.name;

    if(btnName==="unanswered"){

      setLoadAnswered(false);
      localStorage.setItem('answertype', 'unanswered');
      getUserAnswerQuestionTypeAsync("unanswered");

    }
    else{
      
      setLoadAnswered(true);
      localStorage.setItem('answertype', 'answered');
      getUserAnswerQuestionTypeAsync("answered");

    }
  }

  return (
    <div className='Section'>
      <div className='pageHeader'>
        <h2>User Page</h2>
      </div>
      <div className="subSection UselectedUserNav">
          <div className="btnSection ">
            <button className={!loadAnswered ? 'simpleBtn simpleBtnActive' : 'simpleBtn'} onClick={handlerQuestions} name="unanswered">
              Unanswered Questions
            </button> |
            <button className={loadAnswered ? 'simpleBtn simpleBtnActive' : 'simpleBtn'} onClick={handlerQuestions} name="answered">
              Answered Questions
            </button> |
            <button className='simpleBtn' onClick={toRoute} name={`leaderboard`}>
              LeaderBoard
            </button> |
            <button className='simpleBtn' onClick={toRoute} name={`add`}>
              Create A New Poll
            </button>
          </div>
        </div>
      <div className='userArea'>
        <SelectedUserProfilePage />
        <div className='subSection selectedUserQuestions'>
          <ProfileQuestionList/>
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedUserProfile)