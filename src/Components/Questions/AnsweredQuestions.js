import React, {Fragment, useEffect} from 'react';
import {mapStateToProps, mapDispatchToProps} from '../../Store/storeProps';
import {connect} from "react-redux";
import {useState} from "react";
import { useParams } from "react-router-dom";
import '../../Style/Questions.css';
import QuestionNavButtons from "./QuestionNavButtons";

function AnsweredQuestions({userList, userAnsweredQuestionList, questionList, getUserListAsync, getQuestionListAsync, getUserAnsweredQuestionsAsync}) {

  const [byPercentage, setByPercentage] = useState(0);

  const params = useParams();

  const idLink = params.question_id;

  const userIdByStorage = localStorage.getItem('userId');

  useEffect(()=>{

    if(typeof userList==="string" && userIdByStorage !== ""){

      const answerTypeByStorage = localStorage.getItem("answered");

      if(answerTypeByStorage !== ""){

        const userAnswered = JSON.parse(answerTypeByStorage);

        getUserListAsync();
        getQuestionListAsync();
        getUserAnsweredQuestionsAsync(userAnswered);

      }
      else{

        localStorage.setItem('userId', '');

      }
    }
  }, [userList])

  useEffect(()=>{
    
    if(typeof userList!=="string"){

      const numberOfUsers = userList.length;
      setByPercentage(Math.round(100/numberOfUsers *10)/10)

    }
    
  },[userList])

  return (
    <Fragment>
      {typeof userAnsweredQuestionList!=="string" && typeof userList!=="string" && typeof questionList!=="string"
        ?
          userAnsweredQuestionList.map(question=>{

            if(question.id===idLink){

              return (
                <div className='Section' key={question.id}>
                  <div className='pageHeader'>
                    <h2>Questions</h2>
                  </div>
                  <div className='subSection'>
                    <QuestionNavButtons />
                    <div className="profileQuestionList">
                      <div className='question-style_noBG'>
                        Would you rather {question.optionOneText} or {question.optionTwoText} ?
                          {questionList.map(allQuestion=>{  

                            if (allQuestion.id===question.id){

                              if(question.answer==="optionOne"){
                                
                                return (
                                  <div className="singleQuestionTwoOptions" key={question.optionOneText}>
                                    <div className="singleQuestionTwoOptions seperateList">
                                      <div className='answerOptions profileUserAnswer'>
                                        Answer - {question.optionOneText} !
                                      </div>
                                      <div>
                                        The number of people who voted for this option - { allQuestion.optionOne.votes.length}
                                      </div>
                                      <div>
                                        The percentage of people who voted for this option - {allQuestion.optionOne.votes.length * byPercentage} %
                                      </div>
                                    </div>
                                    <div className="singleQuestionTwoOptions seperateList">
                                      <div className='answerOptions otherOption'>
                                        Other option - {question.optionTwoText} !
                                      </div>
                                      <div>
                                        The number of people who voted for this option - { allQuestion.optionTwo.votes.length}
                                      </div>
                                      <div>
                                        The percentage of people who voted for this option - {allQuestion.optionTwo.votes.length * byPercentage} %
                                      </div>
                                    </div>   
                                  </div>                         
                                )
                              }
                              else{
                                return (
                                  <div className="singleQuestionTwoOptions" key={question.optionTwoText}>
                                    <div className="singleQuestionTwoOptions seperateList">
                                      <div className='answerOptions profileUserAnswer'>
                                        Answer - {question.optionTwoText} !
                                      </div>
                                      <div>
                                        The number of people who voted for this option - { allQuestion.optionTwo.votes.length}
                                      </div>
                                      <div>
                                        The percentage of people who voted for this option - {allQuestion.optionTwo.votes.length * byPercentage} %
                                      </div>
                                    </div>
                                    <div className="singleQuestionTwoOptions seperateList">
                                      <div className='answerOptions otherOption'>
                                        Other option - {question.optionOneText} !
                                      </div>
                                      <div>
                                        The number of people who voted for this option - { allQuestion.optionOne.votes.length}
                                      </div>
                                      <div>
                                        The percentage of people who voted for this option - {allQuestion.optionOne.votes.length * byPercentage} %
                                      </div>
                                    </div>
                                  </div>                       
                                )
                              }  
                            }
                            else{
                              return false
                            }
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
            else{
              return false
            }
          })
        :
          <div className='subSection'>
            <QuestionNavButtons />
          </div>
        }
    </Fragment> 
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(AnsweredQuestions)
