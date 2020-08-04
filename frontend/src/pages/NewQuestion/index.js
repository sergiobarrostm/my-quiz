import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./style.css";
import api from "../../services/api";

export default function NewQuestion() {
  const [title, setTitle] = useState();
  const [option_a, setOptionA] = useState();
  const [option_b, setOptionB] = useState();
  const [option_c, setOptionC] = useState();
  const [option_d, setOptionD] = useState();
  const [answer, setAnswer] = useState();
  const [subjects, setSubjects] = useState([]);
  const [subjectValue, setSubjectValue] = useState();

  const userID = localStorage.getItem("userId");

  useEffect(() => {
    api.get("subjects").then((response) => {
      setSubjects(response.data);
    });
  });

  async function handleNewQuestion(e) {
    e.preventDefault();

    if (subjectValue === undefined || answer === undefined) {
      return alert("Selecione uma opção");
    }

    const data = {
      title,
      answer,
      option_a,
      option_b,
      option_c,
      option_d,
    };

    try {
      await api.post("question", data, {
        headers: {
          subject_id: subjectValue,
          authorization: userID,
        },
      });
      alert("Questão Cadastrada com Sucesso!");
      window.location.reload();
    } catch (err) {
      alert("Erro ao cadastrar a questão, tente novamente");
    }
  }

  return (
    <div className="container">
      <h1>Criar Questão</h1>
      <div>
        <label className="form-check-label">Enunciado</label>
        <input
          className="form-control"
          placeholder="Digite o enunciado da questão"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="form-check-label">Alternativa A</label>
        <input
          className="form-control"
          placeholder="Alternativa A"
          value={option_a}
          onChange={(e) => setOptionA(e.target.value)}
        />

        <label className="form-check-label">Alternativa B</label>
        <input
          className="form-control"
          placeholder="Digite a alternativa B"
          value={option_b}
          onChange={(e) => setOptionB(e.target.value)}
        />

        <label className="form-check-label">Alternativa C</label>
        <input
          className="form-control"
          placeholder="Digite a alternativa C"
          value={option_c}
          onChange={(e) => setOptionC(e.target.value)}
        />

        <label className="form-check-label">Alternativa D</label>
        <input
          className="form-control"
          placeholder="Digite a alternativa D"
          value={option_d}
          onChange={(e) => setOptionD(e.target.value)}
        />

        <div className="row">
          <div className="col">
            <label className="form-check-label">Alternativa Correta</label>
            <select
              className="form-control"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            >
              <option>Selecione</option>
              <option value={option_a}>Alternativa A</option>
              <option value={option_b}>Alternativa B</option>
              <option value={option_c}>Alternativa C</option>
              <option value={option_d}>Alternativa D</option>
            </select>
          </div>

          <div className="col">
            <label className="form-check-label">Assunto</label> <br></br>
            <select
              className="form-control"
              value={subjectValue}
              onChange={(e) => setSubjectValue(e.target.value)}
              defaultValue={subjectValue}
            >
              <option>Selecione</option>
              {subjects.map((subjects) => (
                <option key={subjects.id} value={subjects.id}>
                  {subjects.name}
                </option>
              ))}
            </select>
            <Link to="/subject/new">Criar Assunto</Link>
          </div>
        </div>
        <div className="text-center">
          <button
            className="btn btn-success btn-create"
            onClick={handleNewQuestion}
          >
            Cadastrar
          </button>
          <Link className="btn btn-secondary btn-create" to="/profile">
            Voltar para o Início
          </Link>
        </div>
      </div>
    </div>
  );
}
