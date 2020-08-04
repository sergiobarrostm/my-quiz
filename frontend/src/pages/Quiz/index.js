import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

import api from "../../services/api";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState();
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const subjectId = localStorage.getItem("subjectId");
  const userName = localStorage.getItem("userName");

  useEffect(() => {
    api.get(`questions/${subjectId}`).then((response) => {
      setQuestions(response.data);
    });
  });

  function nextQuestion() {
    if (userAnswer === undefined) {
      return alert("Selecione uma alternativa");
    }

    checkQuestion();
    setCurrentQuestion(currentQuestion + 1);
    setQuestionsAnswered(questionsAnswered + 1);
  }

  function checkQuestion() {
    if (questions[currentQuestion].answer === userAnswer) {
      return setCorrectAnswers(correctAnswers + 1);
    }
  }

  function finishQuiz() {
    setCurrentQuestion(questions.length + 1);
  }

  return (
    <div className="container">
      {questions.length > currentQuestion ? (
        <div>
          <div className="text-center">
            <h1 className="">{questions[currentQuestion].name}</h1>
            <h2 className="question-description">
              Questão: {questionsAnswered + 1} de {questions.length}
            </h2>
          </div>

          <div className="question-container">
            <h1 className="question-title">
              {questions[currentQuestion].title}
            </h1>

            <div className="options-container">
              <input
                className="form-check-input"
                type="radio"
                id="option_a"
                name="option"
                value={questions[currentQuestion].option_a}
                onChange={(e) => setUserAnswer(e.target.value)}
              />
              <label className="form-check-label">
                {questions[currentQuestion].option_a}
              </label>{" "}
              <br></br>
              <input
                className="form-check-input"
                type="radio"
                id="option_b"
                name="option"
                value={questions[currentQuestion].option_b}
                onChange={(e) => setUserAnswer(e.target.value)}
              />
              <label className="form-check-label">
                {" "}
                {questions[currentQuestion].option_b}
              </label>{" "}
              <br></br>
              <input
                className="form-check-input"
                type="radio"
                id="option_c"
                name="option"
                value={questions[currentQuestion].option_c}
                onChange={(e) => setUserAnswer(e.target.value)}
              />
              <label className="form-check-label">
                {" "}
                {questions[currentQuestion].option_c}
              </label>{" "}
              <br></br>
              <input
                className="form-check-input"
                type="radio"
                id="option_d"
                name="option"
                value={questions[currentQuestion].option_d}
                onChange={(e) => setUserAnswer(e.target.value)}
              />
              <label className="form-check-label">
                {questions[currentQuestion].option_d}
              </label>
              <br></br>
            </div>
          </div>
          <div className="text-center">
            <button className="col-3 btn btn-primary" onClick={nextQuestion}>
              Responder
            </button>
            <button className="col-3 btn btn-danger" onClick={finishQuiz}>
              Finalizar Quiz
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div className="result-container text-center">
            <h1>{userName}, seu aproveitamento foi assim:</h1>
            <h2 className="text-primary">
              Questões Respondidas: {questionsAnswered}
            </h2>
            <h2 className="text-success">
              Questões Corretas: {correctAnswers}
            </h2>
            <h2 className="text-danger">
              Questões Erradas: {questionsAnswered - correctAnswers}
            </h2>
          </div>
          <Link className="btn btn-secondary" to="/profile">
            Voltar para o Início
          </Link>
        </div>
      )}
    </div>
  );
}
