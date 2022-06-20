import React, {useState, useEffect, Fragment} from 'react';
import {mapStateToProps, mapDispatchToProps} from '../../Store/storeProps';
import {connect} from "react-redux";
import '../../Style/Questions.css'
import UnAnsweredQuestions from './UnAnsweredQuestions';
import AnsweredQuestions from './AnsweredQuestions';
import FindOutAnsweredOrNot from './FindOutAnsweredOrNot';
import {Routes, Route } from "react-router-dom";
import Error404Page from "../Error404Page";

function QuestionList({userAnswerQuestionType}) {

  const [answerType, setAnswerType] = useState();
  const [findOutAnsweredOrNot, setFindOutAnsweredOrNot] = useState(false); 

  const questionPath = "/questions/:question_id";

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

  }, [userAnswerQuestionType, userAnswerType]);

  const findOutAnsweredOrUnanswered = () =>{


    if(!findOutAnsweredOrNot){

      if(!answerType){

        return <Route path = {questionPath}  element={<UnAnsweredQuestions/>}/>

      }
      else {

        return <Route path = {questionPath}  element={<AnsweredQuestions />}/>

      }
    }
    else{

      return (

        <Fragment>
          <Route path = {questionPath}  element={<FindOutAnsweredOrNot />}/>
          <Route path = "*"  element={<Error404Page />}/>
        </Fragment>
      
      )
    }

  }

  return (

    <Routes>
      {findOutAnsweredOrUnanswered()}
    </Routes>      

  )
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList)