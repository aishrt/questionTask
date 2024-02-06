import React, { useEffect, useState } from "react";
import "./App.css";
import questionsData from "./questions.json";

function App() {
  const [loader, setLoader] = useState(true);
  setTimeout(() => {
    setLoader(false);
  }, [1700]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [percent, setPercent] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    // const indexVal = currentQuestionIndex + 1;
    const per = (currentQuestionIndex / 20) * 100;
    setPercent(per);
  }, [currentQuestionIndex]);
  const handleAnswerClick = (answer) => {
    if (answer === questionsData[currentQuestionIndex].correct_answer) {
      setShowResult(true);
    } else {
      setShowResult(false);
    }
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    setShowResult(false);
    setSelectedAnswer("");
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const renderStars = (difficulty) => {
    let count = 0;

    if (difficulty === "easy") {
      count = 1;
    } else if (difficulty === "easy") {
      count = 2;
    } else {
      count = 3;
    }
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < count) {
        stars.push(
          <span key={i}>
            <i className="fa-solid fa-star"></i>
          </span>
        );
      } else {
        stars.push(
          <span key={i}>
            <i className="fa-regular fa-star"></i>
          </span>
        );
      }
    }
    return stars;
  };

  const renderOptions = () => {
    return questionsData[currentQuestionIndex].incorrect_answers
      .concat(questionsData[currentQuestionIndex].correct_answer)
      .sort()
      .map((answer, index) => (
        <div key={index}>
          <div
            className="selectButton"
            onClick={() => handleAnswerClick(answer)}
          >
            {answer}
          </div>
        </div>
      ));
  };

  return (
    <>
      {loader ? (
        <div className="loaderDiv">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <progress
            className="progresbars"
            value={percent}
            max="100"
          ></progress>
          <div className="container">
            {/* <h1>{percent}</h1> */}
            <div className="mainBox">
              <div className="innerBox">
                <div className="hd1">
                  Question {currentQuestionIndex + 1} of 20
                </div>
                <div className="hd2">
                  {questionsData[currentQuestionIndex].category}
                </div>
                <div>
                  {renderStars(questionsData[currentQuestionIndex].difficulty)}
                </div>
                <div>
                  {decodeURIComponent(
                    questionsData[currentQuestionIndex].question
                  )}
                </div>
                <form>{renderOptions()}</form>
                {selectedAnswer && (
                  <div>
                    {selectedAnswer ===
                    questionsData[currentQuestionIndex].correct_answer ? (
                      <span className="correct">Correct</span>
                    ) : (
                      <span className="error">Sorry. Please try again.</span>
                    )}
                  </div>
                )}
                {selectedAnswer && (
                  <div className="nextDiv">
                    <button onClick={handleNextQuestion}>Next Question</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
