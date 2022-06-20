import React , {Fragment} from 'react'

function LeaderBoardUser({answersOrQuestions}) {
  
  return (
    <Fragment>
      {answersOrQuestions!=="Loading" 
        ? 
          answersOrQuestions.map(user=>
            <li key={user.id} className="subSection">
              <div className='profile'>
                <div className='imagePlace'>
                  <img src={user.avatarURL} alt="avatar" />
                </div>
                <div className='profileInfo'>
                  <p>
                    <b>Name :</b>
                    <span className='profileDetails'>
                      {user.name}
                    </span>
                  </p> 
                  <p>
                    <b>The number of questions the user asked :</b>
                    <span className='profileDetails'>
                      {user.questions}
                    </span>
                  </p>
                  <p>
                    <b>The number of questions the user answered :</b>
                    <span className='profileDetails'>
                      {user.answers}
                    </span>
                  </p>
                </div>
              </div>
            </li>) 
        : 
          <Fragment>
          </Fragment>}
    </Fragment>
  )
}

export default LeaderBoardUser