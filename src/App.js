import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'
import Paginate from './pages/Paginate';
import ProgressBar from "react-customizable-progressbar"


function App() {

  const [data, setData] = useState([])
  const [score, setScore] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(1)
  const [seconds, setSeconds] = useState(60);
  const [isDisabled, setDisabled] = useState(false)
  const [scoreShow, setScoreShow] = useState(false)


  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setSeconds(0);
    }

    return () => {
      clearInterval(seconds)
    }
  }, [seconds]);


  useEffect(() => {
    getData()

  }, [data])

  const getData = async () => {
    const { data } = await axios.get(
      "https://gist.githubusercontent.com/saifsathisah/dd92d7477af41a875df6ee33e36bd74a/raw/0bcd49efcaac0af46f695c355e76fc5848fcedd0/QuizData.json"
    )
    setData(data)
}
  
  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  const IndexOfLastPost = currentPage * postPerPage
  const indexOfFirstPost = IndexOfLastPost - postPerPage
  let currentPost = data.slice(indexOfFirstPost, IndexOfLastPost)

  const handleInc = () => {
    if (currentPage < 10) {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(currentPage)
    }
    setSeconds(60)
    setDisabled(true)
  }


  const handleDec = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(currentPage)
    }
    setSeconds(60)
    
  }

  const handleCrct = (e) => {
    e.preventDefault();
    const check = e.target.innerText;
    const filt = data.map((a) => a.answer)
    const b = filt.find(a => a === check) ? true : false;
    if (b === false) {
      setScore(score)
    } else {
      setScore(score + 1)
    }
  }

  const handleFirst = () => {
    setCurrentPage(1)
  }

  const handleLast = () => {
    setCurrentPage(10)
  }

  const handleShow = () => {
    setScoreShow(true)
  }

  const handleExit = () => {
    setScoreShow(false)
  }





  return (

    <div className="App">
      <h2>Quiz App</h2>

      {scoreShow === false ? <>
        <div className="count">
          <p>Count Down : {seconds} .Seconds</p>
        </div>

        <div className="container">
          {currentPost.map((d, index) => (

            <div>
              <p className="page-cont">Question {currentPage} of the 10</p>
              <div className="ques-cont">
                <h4 className="quest">{currentPage}.{d.question}</h4>

                {d.option.map((val, index) => (
                  <div className="comp" key={index}>
                    <button type="button" class="btn btn-light" onClick={(e) => handleCrct(e)}>{val}</button>
                  </div>
                ))}

              </div>
            </div>
          ))}
        </div>
        
        <div className="foot-1">
          {currentPage === 1 ? null : <button className="bttn-3" onClick={handleFirst}>First</button>}
          <button className="bttn-3" onClick={handleDec} disabled={isDisabled}>Prev</button>
          {currentPage === 10 ? null : <button className="bttn-3" onClick={handleInc}>Next</button>}
          {currentPage === 10 ? null : <button className="bttn-3" onClick={handleLast}>Last</button>}
          {currentPage === 10 ? <button className="bttn-3" onClick={handleShow}>Submit</button> : null}
        </div>

        <div className="foot-2">
          <Paginate className="bttn-2" postPerPage={postPerPage} totalPost={data.length} paginate={paginate} currentPage={currentPage} />
        </div>

        <div className="foot-3">
          <button className="bttn-3">Quiz</button>
          <button className="bttn-3">Review</button>
          <button className="bttn-3" onClick={handleShow}>Submit Quiz</button>
        </div>
      </>

        : <>
          <div className="progress">

            <ProgressBar
              radius={120}
              progress={score * 10}
              strokeWidth={30}
              trackStrokeColor="grey"
              trackStrokeWidth={30}
              strokeColor="blue"
              pointerRadius={15}
              pointerStrokeColor="black"
            >
              <h4>You cleared {score} questions out of 10 !..</h4>
            </ProgressBar>
            <button className="bttn-4" onClick={handleExit}>Exit</button>

          </div>
        </>}







    </div>
  );
}

export default App;
