import { combineReducers } from 'redux';
import userReducer from './users';
import questionReducer from './questions';
import answerReducer from './answers'

export default combineReducers({
  userReducer,
  questionReducer,
  answerReducer
})
