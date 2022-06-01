import {_getUsers as getUsers} from '../Data/_DATA';

const GETUSERLIST = "GETUSERLIST";
const LOGIN = "LOGIN";
const ISLOGGED = "ISLOGGED";

const getUserList = (users) => {
  return {
    type: GETUSERLIST,
    payload: Object.values(users)
  }
}

export const getUserListAsync = () => dispatch =>{

  getUsers()
  .then(data => {
   
    const userList = Object.values(data)

    dispatch(getUserList(userList))
   
  })
  .catch(er => {
    console.log(er)
  });
}

const logInUser = (loggedUser) => {
  return {
    type: LOGIN,
    payload: loggedUser
  }
}

export const logInUserAsync = (user) => dispatch =>{

  dispatch(logInUser(user))
}

const isLogged = (check) => {
  return {
    type: ISLOGGED,
    payload: check
  }
}

export const isLoggedAsync = (check) => dispatch =>{

  dispatch(isLogged(check))
}