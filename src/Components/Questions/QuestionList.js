import React, {useState, useEffect} from 'react';
import {mapStateToProps, mapDispatchToProps} from '../../Store/storeProps';
import {connect} from "react-redux";
import '../../Style/Questions.css'
import UnAnsweredQuestions from './UnAnsweredQuestions';
import AnsweredQuestions from './AnsweredQuestions';
import FindOutAnsweredOrNot from './FindOutAnsweredOrNot';
import {Routes, Route } from "react-router-dom";
// import Error404Page from "../Error404Page";

function QuestionList({userAnswerQuestionType}) {

  const [answerType, setAnswerType] = useState();
  const [findOutAnsweredOrNot, setFindOutAnsweredOrNot] = useState(false); 

  const userAnswerType = localStorage.getItem('answertype');

  useEffect(()=>{

   if(userAnswerType === "answered"){

    setAnswerType(true)

   }
   else if(userAnswerType === "unanswered"){

    setAnswerType(false)

   }
   else{

    setFindOutAnsweredOrNot(true)

   }

  }, [userAnswerQuestionType, localStorage.getItem('answertype')]);

  const findOutAnsweredOrUnanswered = () =>{


    if(!findOutAnsweredOrNot){

      if(!answerType){

        return <Route path="/questions/:question_id"  element={<UnAnsweredQuestions/>}/>

      }
      else {

        return <Route path="/questions/:question_id"  element={<AnsweredQuestions />}/>

      }
    }
    else{

      return <Route path="/questions/:question_id"  element={<FindOutAnsweredOrNot />}/>
      
    }

  }

  return (

    <Routes>
      {findOutAnsweredOrUnanswered()}
    </Routes>      

  )
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList)