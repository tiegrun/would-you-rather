import {bindActionCreators} from "redux";
import actions from '../Actions'

export const mapStateToProps = (state) =>{

  const userState = state.userReducer;
  const questionState = state.questionReducer;
  const answerState = state.answerReducer;
  
  // console.log(answerState.isUpdateUserList, answerState.isUpdateQuestionList)

  return{
    userList: userState.userList.length === 0 ? "User List Is Empty" : userState.userList,
    loggedUser: userState.loggedUser.length === 0 ? "No User" : userState.loggedUser,
    isLogged: userState.isLogged,

    questionList: questionState.questionList.length === 0 ? "Question List Is Empty" : questionState.questionList,

    userAnsweredQuestionList: questionState.userAnsweredQuestionList.length === 0 ? "Question List Is Empty" : questionState.userAnsweredQuestionList,
    userUnansweredQuestionList: questionState.userUnansweredQuestionList.length === 0 ? "Question List Is Empty" : questionState.userUnansweredQuestionList,
    userAnswerQuestionType: questionState.userAnswerQuestionType,

    isUpdateUserList: answerState.isUpdateUserList,
    isUpdateQuestionList: answerState.isUpdateQuestionList,

    createdQuestions: questionState.createdQuestions
  }
}

export const mapDispatchToProps = (dispatch) =>{
  return bindActionCreators(actions, dispatch);
}