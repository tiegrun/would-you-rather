import {_saveQuestionAnswer as saveQuestionAnswer} from "../Data/_DATA";

const ANSWERQUESTION = "ANSWERQUESTION";

const saveAnswer = (isUpdateUserList, isUpdateQuestionList) => {
  return {
    type: ANSWERQUESTION,
    payload: {
      isUpdateUserList,
      isUpdateQuestionList
    }
  }
}

export const saveAnswerAsync = ({authedUser, qid, answer, isUpdateUserList, isUpdateQuestionList}) => dispatch =>{

  saveQuestionAnswer({authedUser, qid, answer })
  .then(()  => {

      dispatch(saveAnswer(isUpdateUserList, isUpdateQuestionList))
  })
  .catch(er => {
    console.log(er)
  });
}