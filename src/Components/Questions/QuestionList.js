import React, {useState, useEffect} from 'react';
import {mapStateToProps, mapDispatchToProps} from '../../Store/storeProps';
import {connect} from "react-redux";
import '../../Style/Questions.css'
import UnAnsweredQuestions from './UnAnsweredQuestions';
import AnsweredQuestions from './AnsweredQuestions';
import {Routes, Route } from "react-router-dom";
// import Error404Page from "../Error404Page";

function QuestionList({userAnswerQuestionType}) {

  const [answerType, setAnswerType] = useState();

  const userAnswerType = localStorage.getItem('answertype');

  useEffect(()=>{

    if(userAnswerQuestionType==="unanswered"){

      if(userAnswerType==="unanswered"){

        setAnswerType(false);

      }
      else{

        setAnswerType(true);

      }
    }
    else{

      setAnswerType(true);
      
    }

  }, [userAnswerQuestionType, userAnswerType]);

  
  return (
    <Routes>
      {!answerType
        ? 
          <Route path="/questions/:question_id"  element={<UnAnsweredQuestions/>}/>
        :
          <Route path="/questions/:question_id"  element={<AnsweredQuestions />}/>
      }
    </Routes>      
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList)