import React from 'react'
import { useEffect } from 'react';
import {mapStateToProps, mapDispatchToProps} from '../../Store/storeProps';
import {connect} from "react-redux";
import "../../Style/ProfileQuestionList.css";
import ProfileQuestion from './ProfileQuestion';


function ProfileQuestionList({loggedUser, questionList,  getQuestionListAsync, getUserAnsweredQuestionsAsync, getUserUnansweredQuestionsAsync, isUpdateQuestionList, createdQuestions}) {

  useEffect(()=>{

    if(isUpdateQuestionList){

      getQuestionListAsync()

    }

  },[isUpdateQuestionList])

  useEffect(()=>{

    getQuestionListAsync()
    
  }, [createdQuestions.length])

  useEffect(() => {

    if(typeof questionList === "string"){

      getQuestionListAsync()
      
    } 
    else{

      const loggedUserId = loggedUser[0].id;

      const orderByTimeStamp = (a, b) => { 

        return b.timestamp - a.timestamp

      }

      const questionOptionsVotes = questionList.map(question=>{

        const userVotedOptions = loggedUser[0].answers;

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
  },[questionList, loggedUser, isUpdateQuestionList]);

  return (
    <div>
      <ProfileQuestion />
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileQuestionList);