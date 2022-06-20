import React, {useState, useEffect, Fragment} from 'react';
import {mapStateToProps, mapDispatchToProps} from '../Store/storeProps';
import {connect} from "react-redux";
import SelectedUserProfilePage from "./SelectUserComponent/SelectedUserProfilePage";
import QuestionNavButtons from "./Questions/QuestionNavButtons"

function Error404Page({loggedUser}) {

  const [loginAgain, setLoginAgain] = useState(true);

  const userIdByStorage = localStorage.getItem('userId');

  useEffect(()=>{

    if(userIdByStorage === "" || loggedUser === "No User"){

      setLoginAgain(true)

    }
    else{

      setLoginAgain(false)

    }

  },[userIdByStorage, loggedUser])

  return (
    <Fragment>
      {
        loginAgain
          ?
            <SelectedUserProfilePage />
          :
            <Fragment>
              <div className='Section'>
              <div className='pageHeader'>
                <h2>This page does not exist</h2>
              </div>
              <div className='subSection'>
                <QuestionNavButtons />
                <div className="profileQuestionList">
                  <h1 className='err404'>Error 404</h1>
                </div>
              </div>
            </div>
          </Fragment> 
      }
    </Fragment>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Error404Page)

