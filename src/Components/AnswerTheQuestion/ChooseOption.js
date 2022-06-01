import React, {Fragment} from 'react';
import {mapStateToProps, mapDispatchToProps} from '../../Store/storeProps';
import {connect} from "react-redux";
import { useNavigate } from "react-router-dom";

function ChooseOption({question, getUserListAsync, saveAnswerAsync}) {

  let navigate = useNavigate();

  const handleclick = (e)=>{

    const authedUser = localStorage.getItem('userId');
    const qid = question.id;
    const answer = e.target.name.slice(0, -4);
    const isUpdateUserList = true;
    const isUpdateQuestionList = true;
    
    saveAnswerAsync({authedUser, qid, answer, isUpdateUserList, isUpdateQuestionList});

    getUserListAsync();

    navigate(`/`)
   
  }

  return (
    <Fragment>
      <div className='answerOptions'>
        <button className="simpleBtn btnOptions" name="optionOneText" onClick={handleclick}>{question.optionOneText}</button> 
      </div>
      <div className='answerOptions'>
        <button className="simpleBtn btnOptions" name="optionTwoText" onClick={handleclick}>{question.optionTwoText}</button>
      </div>
    </Fragment>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseOption)