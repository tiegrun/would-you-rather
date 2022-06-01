const initialUsersState = {
  questionList: [],
  userAnsweredQuestionList: [],
  userUnansweredQuestionList: [], 
  userAnswerQuestionType: "unanswered",
  createdQuestions: []
}

const questionReducer = (state=initialUsersState, action)=>{
  
  switch(action.type){
    
    case "GETQUESTIONLIST":
      return {
        ...state, 
        questionList: action.payload
      };

    case "GETUSERANSWEREDQUESTIONS":
      return {
        ...state, 
        userAnsweredQuestionList: action.payload
      };

    case "GETUSERUNANSWEREDQUESTIONS":
      return {
        ...state, 
        userUnansweredQuestionList: action.payload
      };   
      
    case "GETUSERANSWERQUESTIONTYPE":
      return {
        ...state, 
        userAnswerQuestionType: action.payload
      }; 

    case "CREATEQUESTION":
      return {
        ...state,
        createdQuestions: [...state.createdQuestions, action.payload]
      };

    default:
      return state
  }
}

export default questionReducer