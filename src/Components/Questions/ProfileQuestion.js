import React, {useEffect, useState} from 'react'
import {mapStateToProps, mapDispatchToProps} from '../../Store/storeProps';
import {connect} from "react-redux";
import {Link} from 'react-router-dom';

function ProfileQuestion({userUnansweredQuestionList, userAnsweredQuestionList, userAnswerQuestionType, isUpdateQuestionList, createdQuestions }) {

  const [loadingOrEmpty, setLoadingOrEmpty] = useState(
    <div className='profileQuestionLoading'>
      ... Loading
    </div>
  )

  const [linkClassName, setLinkClassName] = useState("link")

  useEffect(()=>{

    let isMounted = true;  

    setTimeout(()=>{
      if((typeof userAnsweredQuestionList === "string" || typeof userUnansweredQuestionList === "string") && isMounted){
        setLoadingOrEmpty(
          <div className='profileQuestionLoading danger'>
            This List Is Empty
          </div>
        )
      } 
    }, 1000)
    
    return () => { isMounted = false }

  }, [userUnansweredQuestionList, userAnsweredQuestionList, userAnswerQuestionType])

  useEffect(()=>{

    let timer;
    
    if(isUpdateQuestionList){
      setLinkClassName("link unClickAble")

      timer = setTimeout(()=>{
        setLinkClassName("link")
      }, 1000)
    }
    else{
      setLinkClassName("link")
    }

    return () => {
      clearTimeout(timer);
    };

  }, [isUpdateQuestionList])

  useEffect(()=>{
  
    setLinkClassName("link unClickAble")

    let timer = setTimeout(()=>{
      setLinkClassName("link")
    }, 1000)

    return () => {
      clearTimeout(timer);
    };
    
  }, [createdQuestions.length]);

  const handleAnswerTypeLocalStorage = () => {

    localStorage.setItem('answertype', userAnswerQuestionType);

  }

  if(userAnswerQuestionType ==="unanswered"){
    return ((typeof userUnansweredQuestionList === "string") ? loadingOrEmpty : userUnansweredQuestionList.map(op=>{
      return (
        <ul className="profileQuestionList" key={op.id} >
          <li key={op.optionOneText}>
            <Link to={`/questions/${op.id}`} className={linkClassName} onClick={handleAnswerTypeLocalStorage}>
              Would you rather {op.optionOneText} or {op.optionTwoText} ?
            </Link>
          </li>
        </ul>
      )
    }))
  }
  else if(userAnswerQuestionType ==="answered"){
    return ((typeof userAnsweredQuestionList === "string") ? loadingOrEmpty : userAnsweredQuestionList.map((op, index)=>{
      return ( 
        <ul className="profileQuestionList" key={op.id} >
          <li className='profileUserAnswerList' key={op.optionTwoText}>
            <Link to={`/questions/${op.id}`} className="link">
              Would you rather {op.optionOneText} or {op.optionTwoText} ? 
            </Link>
          </li>
          <li className='profileUserAnswerList' key={index}>Answer -   
            <span className='profileUserAnswer'>{op[`${op.answer+"Text"}`]} !</span>
          </li>
        </ul>
      )
    }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileQuestion)