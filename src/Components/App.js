import React, {useState, useEffect, Fragment} from 'react';
import '../Style/App.css';
import {mapStateToProps, mapDispatchToProps} from '../Store/storeProps';
import {connect} from "react-redux";
import SelectUserList from './SelectUserComponent/SelectUserList';
import Leaderboard from './LeaderBoardComponent/LeaderBoard';
import QuestionList from './Questions/QuestionList';
import AddQuestions from './CreateQuestions/AddQuestions'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Error404Page from "./Error404Page";

function App({isLogged}) {

  const [isAllowed, setIsAllowed] = useState(false);
  

  useEffect(()=>{
    const userId = localStorage.getItem('userId');

    if(userId!==""){
      
      setIsAllowed(true)

    }
    else{

      setIsAllowed(false)

    }

  }, [localStorage.getItem('userId'), isLogged])

  return (
    <BrowserRouter>
      <div className="App">
        <div>
          <h1>Would You Rather</h1>
        </div>
        <Routes>
          <Route exact path='/' element={<SelectUserList />}/>  
          {isAllowed 
            ?
              <Fragment>
                <Route exact path="/leaderboard"  element={<Leaderboard />}/>
                <Route path="/*"  element={<QuestionList />}/>
                <Route path="/add"  element={<AddQuestions />}/>
              </Fragment>
            :
              <Route path="/*"  element={<Error404Page />}/>
          }
        </Routes>
      </div>  
    </BrowserRouter>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

