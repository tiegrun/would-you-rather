import React, { Fragment, useEffect} from 'react';
import {mapStateToProps, mapDispatchToProps} from '../../Store/storeProps';
import {connect} from "react-redux";
import SelectedUserProfilePage from "../SelectUserComponent/SelectedUserProfilePage";
import { useParams } from "react-router-dom";

function FindOutAnsweredOrNot({loggedUser, getQuestionListAsync, questionList, getUserAnsweredQuestionsAsync, getUserUnansweredQuestionsAsync, userAnswerQuestionType}) {

  const getUserIdByLocalStorage = localStorage.getItem('userId');

  const params = useParams();

  const idLink = params.question_id;

  useEffect(() => {

    console.log(loggedUser)

    if(loggedUser === "No User" || getUserIdByLocalStorage === ""){

      getQuestionListAsync()

    }
    else{

      const loggedUserId = loggedUser[0].id;
      const userVotedOptions = loggedUser[0].answers;

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
  }, [loggedUser])

  useEffect(() =>{

    const getAnswerTypeLocalStorage = localStorage.getItem('answertype')
    

    if(getAnswerTypeLocalStorage !== ""){

     console.log("refresh")
     window.location.reload();

    }

  }, [userAnswerQuestionType, localStorage.getItem('answertype')])

  return (
    
    <Fragment>
    {
      loggedUser === "No User"
      ?
        <SelectedUserProfilePage />
      :
        <Fragment>
         <h2>Loading</h2>
        </Fragment>
    }
      
    </Fragment>
                 
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(FindOutAnsweredOrNot)
