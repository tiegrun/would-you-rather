import React, { Fragment, useEffect, useState } from 'react';
import {mapStateToProps, mapDispatchToProps} from '../../Store/storeProps';
import {connect} from "react-redux";
import SelectedUserProfilePage from "../SelectUserComponent/SelectedUserProfilePage";
import QuestionNavButtons from "./QuestionNavButtons"
import { useParams } from "react-router-dom";

function FindOutAnsweredOrNot({loggedUser, getQuestionListAsync, questionList, getUserAnsweredQuestionsAsync, getUserUnansweredQuestionsAsync, userAnswerQuestionType}) {
 
  const [loadingOrError, setLoadingOrError] = useState(true)

  const getUserIdByLocalStorage = localStorage.getItem('userId');

  const params = useParams();

  const idLink = params.question_id;

  useEffect(() => {

    if(loggedUser === "No User" || getUserIdByLocalStorage === ""){

      getQuestionListAsync(questionList)

    }
    else{

      const loggedUserId = loggedUser[0].id;
      const userVotedOptions = loggedUser[0].answers;
      const questionsIds = questionList.map(question => question.id)

      if(!questionsIds.includes(idLink)){

        setLoadingOrError(true)

        let timer = setTimeout(()=>{

          setLoadingOrError(false)

         }, 400)

        return () => {
          clearTimeout(timer);
        };

      }
      else{

        if(Object.keys(loggedUser[0].answers).includes(idLink)){
       
          getUserAnsweredQuestionsAsync("answered");
          localStorage.setItem('answertype', "answered");
  
        }
        else{
          getUserAnsweredQuestionsAsync("unanswered");
          localStorage.setItem('answertype', "unanswered");
        }
  
        const orderByTimeStamp = (a, b) => { 
  
          return b.timestamp - a.timestamp
  
        }
  
        const questionOptionsVotes = questionList.map(question=>{
  
            if (Object.keys(userVotedOptions).includes(question.id)){
  
              return {
                id: question.id,
                optionOneText: question.optionOne.text, 
                optionOneVotes: question.optionOne.votes,
                optionTwoText: question.optionTwo.text,
                optionTwoVotes: question.optionTwo.votes,
                answer: userVotedOptions[question.id],
                timestamp: question.timestamp,
              }
            }
            else{
              
              return {
                id: question.id,
                optionOneText: question.optionOne.text, 
                optionOneVotes: question.optionOne.votes,
                optionTwoText: question.optionTwo.text,
                optionTwoVotes: question.optionTwo.votes,
                createdBy: question.author,
                timestamp: question.timestamp,
              }
            }                   
          }  
        ).sort(orderByTimeStamp);
  
        const answeredQuestions = questionOptionsVotes.filter(options=>{
  
          if(options.optionOneVotes.includes(loggedUserId) || options.optionTwoVotes.includes(loggedUserId)){
            
            return options
          }
        })
  
        const unAnsweredQuestions = questionOptionsVotes.filter(options=>{
          if(!options.optionOneVotes.includes(loggedUserId) && !options.optionTwoVotes.includes(loggedUserId)){
            
            return options
            
          }
        })
  
        getUserAnsweredQuestionsAsync(answeredQuestions);
        getUserUnansweredQuestionsAsync(unAnsweredQuestions);
  
        localStorage.setItem('answered', JSON.stringify(answeredQuestions));
        localStorage.setItem('unanswered', JSON.stringify(unAnsweredQuestions));
      }  
    }
  }, [loggedUser])

  useEffect(() =>{

    const getAnswerTypeLocalStorage = localStorage.getItem('answertype')
    
    if(getAnswerTypeLocalStorage !== ""){

     window.location.reload();

    }

  }, [userAnswerQuestionType, localStorage.getItem('answertype')]);

  return (
    
    <Fragment>
    {
      loggedUser === "No User"
        ?
         <SelectedUserProfilePage />
        :
          (
            loadingOrError 
              ? 
                <Fragment>
                  <h2>
                    Loading
                  </h2>
                </Fragment> 
              : 
                <div className='Section'>
                  <div className='pageHeader'>
                    <h2>This page does not exist</h2>
                  </div>
                  <div className='subSection'>
                    <QuestionNavButtons />
                    <div className="profileQuestionList">
                      <h1 className='err404'>Error 404</h1>
                    </div>
                  </div>
                </div>
          )
    }
      
    </Fragment>
                 
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(FindOutAnsweredOrNot)
