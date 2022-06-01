import React, {useState, useEffect} from 'react'
import {mapStateToProps, mapDispatchToProps} from '../../Store/storeProps';
import {connect} from "react-redux";
import ProfileQuestionList from "../Questions/ProfileQuestionList";
import { useNavigate } from "react-router-dom";

function SelectedUserProfile({loggedUser, getUserAnswerQuestionTypeAsync, logInUserAsync, userList}) {

  const [loadAnswered, setLoadAnswered] = useState(false);

  useEffect(()=>{

    if(!loadAnswered){

      getUserAnswerQuestionTypeAsync("unanswered");
      localStorage.setItem('answertype', 'unanswered');

    }
    else{

      getUserAnswerQuestionTypeAsync("answered")

    }
    
  },[loadAnswered, userList])

  const navigate = useNavigate();

  const toRoute = (e) =>{

    const path = e.target.name;

    navigate(path);
  }

  const handlerQuestions = (e)=>{
    const btnName = e.target.name;

    if(btnName==="unanswered"){

      setLoadAnswered(false);
      localStorage.setItem('answertype', 'unanswered');

    }
    else{
      
      setLoadAnswered(true);
      localStorage.setItem('answertype', 'answered');

    }
  }

  const handleLogOut =(e)=>{

    localStorage.setItem('userId', '');
    localStorage.setItem('answered', '');
    localStorage.setItem('unanswered', '');
    localStorage.setItem('answertype', '');

    logInUserAsync([]);
    setLoadAnswered(false);
    
    return toRoute(e);

  }

  return (
    <div className='Section'>
      <div className='pageHeader'>
        <h2>User Page</h2>
      </div>
      <div className="subSection UselectedUserNav">
          <div className="btnSection ">
            <button className={!loadAnswered ? 'simpleBtn simpleBtnActive' : 'simpleBtn'} onClick={handlerQuestions} name="unanswered">
              Unanswered Questions
            </button> |
            <button className={loadAnswered ? 'simpleBtn simpleBtnActive' : 'simpleBtn'} onClick={handlerQuestions} name="answered">
              Answered Questions
            </button> |
            <button className='simpleBtn' onClick={toRoute} name={`leaderboard`}>
              LeaderBoard
            </button> |
            <button className='simpleBtn' onClick={toRoute} name={`add`}>
              Create A New Poll
            </button>
          </div>
        </div>
      <div className='userArea'>
        <ul className='selectedUserProfile'>
          {loggedUser.map(user=>
            <li key={user.id} className="subSection">
              <div className='profile'>
                <div className='imagePlace'>
                  <img src={user.avatarURL} alt="avatar" />
                </div>
                <div className='selectedUserDescription'>
                  <div className='profileInfo selectedUserInfo'>
                    <p>
                      <b>Name :</b>
                      <span className='profileDetails'>
                        {user.name}
                      </span>
                    </p> 
                  </div>
                  <button className='simpleBtn logOutBtn' onClick={handleLogOut} name={`/`}>
                    Exit
                  </button>
                </div>
              </div>
            </li>
          )}
        </ul>
        <div className='subSection selectedUserQuestions'>
          <ProfileQuestionList/>
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedUserProfile)