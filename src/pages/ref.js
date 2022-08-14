import { useEffect, useState } from "react";

export default function App() {
  const [showData, setData] = useState([]);
  const loadData = async () => {
    let response = await fetch(
      "https://opentdb.com/api.php?amount=10&category=22&difficulty=medium&type=multiple"
    );
    const data = await response?.json();
    console.log(data);

    const getQuestions = data.results.map((item) => {
      const question = item.question;
      const answers = [...item.incorrect_answers, item.correct_answer];
      return {
        question: question,
        answers: answers
      };
    });
    return getQuestions;
  };

  useEffect(() => {
    (async () => {
      const getData = await loadData();
      setData(getData);
    })();
  }, []);

  return (
    <>
      {showData.map((data,i) => (
        <>
          <div key={i}>
            <h4>{data.question}</h4>
            // map the answers separately
            {data.answers.map((item,j)=><li key={j}>{item}</li>)}
          </div>
        </>
      ))}
    </>
  );
}