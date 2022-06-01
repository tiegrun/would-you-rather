import React, {useState, useEffect, Fragment} from 'react';
import {mapStateToProps, mapDispatchToProps} from '../../Store/storeProps';
import {connect} from "react-redux";
import '../../Style/Questions.css'
import UnAnsweredQuestions from './UnAnsweredQuestions';
import AnsweredQuestions from './AnsweredQuestions';
import {Routes, Route } from "react-router-dom";
import Error404Page from "../Error404Page";

function QuestionList({userAnswerQuestionType, isLogged, loggedUser}) {

  const [answerType, setAnswerType] = useState();
  const [isAllowed, setIsAllowed] = useState(false);

  const userAnswerType = localStorage.getItem('answertype');
  const userId = localStorage.getItem('userId');

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

  
  useEffect(()=>{

    if(isLogged){
      
      setIsAllowed(true)

    }
    else if(loggedUser!=="No User" || userId!==""){

      setIsAllowed(true)

    }
    else{

      setIsAllowed(false)

    }

  }, [isLogged])
  
  return (

    <Fragment>
      {isAllowed
       ?
        <Routes>
          {!answerType
            ? 
              <Route path="/questions/:question_id"  element={<UnAnsweredQuestions/>}/>
            :
              <Route path="/questions/:question_id"  element={<AnsweredQuestions />}/>
          }
        </Routes> 
      :
        <Routes>
          <Route path="/questions/:question_id"  element={<Error404Page />}/>
        </Routes>
      }
    </Fragment>
        
           
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList)