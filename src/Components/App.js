import '../Style/App.css';
import SelectUserList from './SelectUserComponent/SelectUserList';
import Leaderboard from './LeaderBoardComponent/LeaderBoard';
import QuestionList from './Questions/QuestionList';
import AddQuestions from './CreateQuestions/AddQuestions'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

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
        </Routes>
      </div>  
    </BrowserRouter>
  )
}

export default App

