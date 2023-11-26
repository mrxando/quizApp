import React, { useState, useEffect } from "react";
import Question from "./Question.jsx";
import he from 'he';


export default function Game(){
  
    const [quizData, setQuizData] = React.useState(null);
    const [endQuiz, setEndQuiz] = React.useState(false)
    const [userAnswers, setUserAnswers] = React.useState({})
    const [score, setScore] = React.useState(0)
    
    const decodeHTML = (html) => {
      return he.decode(html);
  }

    const fetchQuizData = async () => {
        try {
            const response = await fetch(`https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple`);
            const data = await response.json();
            setQuizData(data);  // Update the state with the quiz data
        } catch (error) {
            console.error("Error fetching quiz data:", error);
        }
    };

    useEffect(() => {
      fetchQuizData()      
       }, []);
    

  
    function handleAnswers() {
      setEndQuiz(prevEndQuiz => !prevEndQuiz);
      Object.keys(userAnswers).forEach((questionIndex) => {
          if (userAnswers[questionIndex] === quizData.results[questionIndex].correct_answer) {
              console.log(`Question ${questionIndex} is correct`);
              setScore(prevScore => prevScore + 1)
          } else {
              console.log(`Question ${questionIndex} is incorrect`);
          }
      });
    }

    function newQuiz() {
      // Reset the states
      setQuizData(null);
      setUserAnswers({});
      setScore(0);
      setEndQuiz(false);

      // Fetch new quiz data
      fetchQuizData();
  }

  const updateUserAnswer = (questionIndex, selectedOption) => {
    setUserAnswers({ ...userAnswers, [questionIndex]: selectedOption })
}

    return (
    <div className="startGameContainer">
       {quizData && quizData.results 
       ? <>
        {quizData.results.map((question,index) => (
          <Question
            key={index}
            index={index}
            question={decodeHTML(question.question)}
            correctAnswer={decodeHTML(question.correct_answer)}
            incorrectAnswers={question.incorrect_answers.map(answer => decodeHTML(answer))}
            updateUserAnswer={updateUserAnswer}
            endQuiz={endQuiz}
            selectedOption={userAnswers[index]}
          />
        ))}
         <div className="buttons-score">
                        {!endQuiz && <button onClick={handleAnswers} className="find-ans-btn">Find answers</button>}
                        {endQuiz && <button onClick={newQuiz}>New Quiz</button>}
                        {endQuiz && `Your Score : ${score}/5`}
                    </div>
       </> :

        <h1>Cooking Questions for you...</h1>
       }
    </div>)
  }

  

  