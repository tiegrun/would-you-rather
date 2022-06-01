import {getUserListAsync} from "./Users"
import {logInUserAsync} from "./Users"
import {isLoggedAsync} from "./Users"
import {getQuestionListAsync} from "./Questions"
import {getUserAnsweredQuestionsAsync} from "./Questions"
import {getUserUnansweredQuestionsAsync} from "./Questions"
import {getUserAnswerQuestionTypeAsync} from "./Questions"
import {saveAnswerAsync} from "./Answers"
import {addQuestionAsync} from "./Questions"

const actions = {
  getUserListAsync, 
  logInUserAsync, 
  isLoggedAsync, 
  getQuestionListAsync,
  getUserAnsweredQuestionsAsync, 
  getUserUnansweredQuestionsAsync,
  getUserAnswerQuestionTypeAsync, 
  saveAnswerAsync,
  addQuestionAsync
}

export default actions;
