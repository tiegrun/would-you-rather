import React, {Fragment, useEffect} from 'react';
import {mapStateToProps, mapDispatchToProps} from '../../Store/storeProps';
import {connect} from "react-redux";
import { useParams } from "react-router-dom";
import '../../Style/Questions.css';
import QuestionNavButtons from "./QuestionNavButtons";
import ChooseOption from "../AnswerTheQuestion/ChooseOption";

function UnAnsweredQuestions({userList, userUnansweredQuestionList, getUserListAsync, getUserUnansweredQuestionsAsync}) {

  const params = useParams();

  const idLink = params.question_id;

  useEffect(()=>{

    if(typeof userList==="string"){

      const userUnAnswered = JSON.parse(localStorage.getItem("unanswered"));
      
      getUserListAsync();
      getUserUnansweredQuestionsAsync(userUnAnswered);

    }
  },[])

  return (
    <Fragment>
      {typeof userUnansweredQuestionList!=="string" && typeof userList!=="string" 
        ?   
          userUnansweredQuestionList.map(question=>{
          
            if(question.id===idLink){

              return (
                <div className='Section' key={question.id}>
                  <div className='pageHeader'>
                    <h2>Questions</h2>
                  </div>
                  <div className='subSection'>
                    <QuestionNavButtons />
                    <div className="profileQuestionList">
                      <div>
                        {userList.map(user=>user.id===question.createdBy && (
                          <div className='singleQuestion' key={user.id}>
                            <div>
                              <img src={user.avatarURL} alt="avatar" />
                            </div>
                            <div className='createdBy'>
                              Question Created by: {user.name}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className='question-style'>
                        Would you rather {question.optionOneText} or {question.optionTwoText} ?
                        <Fragment>
                          <ChooseOption question={question}/>
                        </Fragment>
                      </div>
                    </div>
                  </div>
                </div>
                )
              }
              else{
                <div>Empty Question List</div>
              }
            })
          :
            <div className='Section'>
              <div className='pageHeader'>
                <h2>Questions</h2>
              </div>
              <div className='subSection'>
                  ...Loading
                </div>
            </div>
         }
    </Fragment> 
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(UnAnsweredQuestions)
