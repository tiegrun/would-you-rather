const initialUsersState = {
  isUpdateUserList: false,
  isUpdateQuestionList: false
}

const answerReducer = (state=initialUsersState, action)=>{
  
  switch(action.type){
    
    case "ANSWERQUESTION":
      return  {
        ...state,
        isUpdateUserList: action.payload.isUpdateUserList,
        isUpdateQuestionList: action.payload.isUpdateQuestionList
      };
      
    default:
      return state
  }
}

export default answerReducer