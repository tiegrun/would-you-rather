const initialUsersState = {
  userList: [],
  loggedUser: [],
  isLogged: false
}

const userReducer = (state=initialUsersState, action)=>{
  
  switch(action.type){
    
    case "GETUSERLIST":
      return {
        ...state, 
        userList: action.payload
      };

    case "LOGIN":  
      return {
        ...state, 
        loggedUser: action.payload
      };

    case "ISLOGGED":
      return {
        ...state,
        isLogged: action.payload
      }

    default:
      return state
  }
}

export default userReducer