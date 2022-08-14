import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {

  const [data, setData] = useState([])
  const [current, setCurrent]= useState(0)

  useEffect(() => {
    getData();
  },[data])

  const getData = async() => {
    const {data} = await axios.get(
      "https://gist.githubusercontent.com/saifsathisah/dd92d7477af41a875df6ee33e36bd74a/raw/0bcd49efcaac0af46f695c355e76fc5848fcedd0/QuizData.json"
    )
    setData(data)
    console.log(data)
  }


  return (
    <div className="App">
      <h5>Quiz App</h5>
      {/* {console.log(data)}
      <div>{data}</div> */}
    </div>
  );
}

export default App;
