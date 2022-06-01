import {_getQuestions as getQuestions} from "../Data/_DATA"
import {_saveQuestion as saveQuestion} from "../Data/_DATA"

const GETQUESTIONLIST = "GETQUESTIONLIST"
const GETUSERANSWEREDQUESTIONS = "GETUSERANSWEREDQUESTIONS";
const GETUSERUNANSWEREDQUESTIONS = "GETUSERUNANSWEREDQUESTIONS";
const GETUSERANSWERQUESTIONTYPE = "GETUSERANSWERQUESTIONTYPE";
const CREATEQUESTION = "CREATEQUESTION";


const getQuestionList = (questions) => {
  return {
    type: GETQUESTIONLIST,
    payload: Object.values(questions)
  }
}

export const getQuestionListAsync = () => dispatch =>{

  getQuestions()
  .then(data => {
   
    const questionList = Object.values(data)

    dispatch(getQuestionList(questionList))
   
  })
  .catch(er => {
    console.log(er)
  });
}

const getUserAnsweredQuestions = (questions)=>{
  return {
      type: GETUSERANSWEREDQUESTIONS,
      payload: questions
  }
}

export const getUserAnsweredQuestionsAsync = (questions) => dispatch =>{

  dispatch(getUserAnsweredQuestions(questions))
}

const getUserUnansweredQuestions = (questions)=>{
  return {
      type: GETUSERUNANSWEREDQUESTIONS,
      payload: questions
  }
}

export const getUserUnansweredQuestionsAsync = (questions) => dispatch =>{

  dispatch(getUserUnansweredQuestions(questions))
}

const getUserAnswerQuestionType = (getBtnType)=>{
  return {
      type: GETUSERANSWERQUESTIONTYPE,
      payload: getBtnType
  }
}

export const getUserAnswerQuestionTypeAsync = (getBtnType) => dispatch =>{

  dispatch(getUserAnswerQuestionType(getBtnType))
}

const addQuestion = (addedQuestionId) => {
  return {
    type: CREATEQUESTION,
    payload: addedQuestionId
  }
}

export const addQuestionAsync = (question) => dispatch =>{

  saveQuestion(question)
  .then((data)  => {

    const addedQuestionId = data.id

    dispatch(addQuestion(addedQuestionId))
  })
  .catch(er => {
    console.log(er)
  });
}