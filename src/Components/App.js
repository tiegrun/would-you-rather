import React, {useEffect} from 'react';
import '../Style/App.css';
import SelectUserList from './SelectUserComponent/SelectUserList';
import Leaderboard from './LeaderBoardComponent/LeaderBoard';
import QuestionList from './Questions/QuestionList';
import AddQuestions from './CreateQuestions/AddQuestions'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Error404Page from "./Error404Page";

function App() {

  useEffect(() => {

    const linkNavigateOrReload = performance.getEntriesByType("navigation")[0].type;

    if(linkNavigateOrReload === "navigate") {
      
      localStorage.setItem('userId', '');
      localStorage.setItem('answered', '');
      localStorage.setItem('unanswered', '');
      localStorage.setItem('answertype', '');

    }
}, []);

  return (
    <BrowserRouter>
      <div className="App">
        <div>
          <h1>Would You Rather</h1>
        </div>
        <Routes>
          <Route exact path='/' element={<SelectUserList />}/>      
          <Route exact path="/leaderboard"  element={<Leaderboard />}/>
          <Route path="/*"  element={<QuestionList />}/>
          <Route path="/add"  element={<AddQuestions />}/>
          <Route path="/error404"  element={<Error404Page />}/>
          {/* <Route path="*"  element={<Error404Page />}/> */}
        </Routes>
      </div>  
    </BrowserRouter>
  )
}

export default App

