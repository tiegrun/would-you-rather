import React, {Fragment, useState, useEffect} from 'react';
import {mapStateToProps, mapDispatchToProps} from '../../Store/storeProps';
import {connect} from "react-redux";
import "../../Style/ProfileQuestionList.css";
import { useNavigate } from "react-router-dom";
import Error404Page from "../Error404Page";
import SelectedUserProfilePage from "../SelectUserComponent/SelectedUserProfilePage";

function AddQuestions({addQuestionAsync, loggedUser, isLogged}) {

  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");
  const [checkOptions, setCheckOptions] = useState(true);
  const [isAllowed, setIsAllowed] = useState(true);

  useEffect(()=>{

    const userId = localStorage.getItem('userId');

    if(isLogged){
      
      setIsAllowed(true)

    }
    else if(loggedUser!=="No User" || userId!==""){

      setIsAllowed(true)

    }
    else{

      setIsAllowed(false)

    }

  }, [isLogged])

  let navigate = useNavigate();

  const toRoute = (e)=>{
    const path = e.target.name;

    navigate(path);
  }

  const handleOptions = (e)=>{

    e.preventDefault();

    let value = e.target.value;
    let name = e.target.name
   
    if(name==="optionOne"){

      setOptionOne(value)

    }
    else{

      setOptionTwo(value)

    }
  }

  const addQuestion = (e)=>{
    
    e.preventDefault();
   
    const author = loggedUser!=="No User" ? loggedUser[0].id : localStorage.getItem('userId');

    if((optionOne==="" || optionOne===" ") || (optionTwo==="" || optionTwo===" ")){

      setCheckOptions(false)

    }
    else{

      const question = {
        optionOneText: optionOne,
        optionTwoText: optionTwo,
        author
      };

      addQuestionAsync(question);

      toRoute(e);
    }
  }

  return (
    <Fragment>
      { isAllowed 
        ? 
          <div className='Section LeaderBoard'>
            <div className='pageHeader'>
              <h2>Create A Question</h2>
            </div>   
            <div className='btnSection'> |
              <button className='simpleBtn' onClick={toRoute} name={`/`}>Home</button> |
              <button className='simpleBtn' onClick={toRoute} name={`/leaderboard`}>leaderboard</button> |
            </div>
            <SelectedUserProfilePage />
            <div className='subSection'>
              <div className="profileQuestionList">
                <form>
                  <label>Would you rather 
                    <input type="text" value={optionOne} className='inputFields' minLength="1" maxLength = "160" placeholder='Option One' onChange={handleOptions} name="optionOne"/>
                  </label>
                  <label>or
                    <input type="text" value={optionTwo} className='inputFields' minLength="1" maxLength = "160" placeholder='Option Two' onChange={handleOptions} name="optionTwo"/>
                    ?
                  </label>
                  <button type="submit" className="simpleBtn addQuestionBtn" onClick={addQuestion} name={`/`}>Add This Question</button>
                </form>
              </div>
              {!checkOptions ? <div className='subSection'>It Is Not Correct</div> : <Fragment></Fragment>}
            </div>
          </div> 
        : 
          <Error404Page />
      }
    </Fragment>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(AddQuestions)
