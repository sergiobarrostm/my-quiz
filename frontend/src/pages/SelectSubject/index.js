import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import api from "../../services/api";
import { Button } from "react-bootstrap";

export default function SelectSubject() {
  const [subjects, setSubjects] = useState([]);
  const [subjectValue, setSubjectValue] = useState();

  const history = useHistory();

  localStorage.setItem("subjectId", subjectValue);

  const url = "/quiz/" + subjectValue;

  useEffect(() => {
    api.get("subjects").then((response) => {
      setSubjects(response.data);
    });
  });

  function handleQuiz() {
    if (subjectValue === undefined) {
      return alert("Selecione uma opção");
    }
    history.push(url);
  }

  return (
    <div class="container">
      <h1 className="row">Selecione um assunto</h1>

      <div className="row">
        <div className="col-6">
          <select
            className="form-control"
            value={subjectValue}
            onChange={(e) => setSubjectValue(e.target.value)}
            defaultValue={subjectValue}
          >
            <option>Selecione</option>
            {subjects.map((subjects) => (
              <option key={subjects.id} value={subjects.id}>
                {subjects.name}{" "}
              </option>
            ))}
          </select>
        </div>

        <div class="col-6">
          <Button className="btn btn-success" onClick={handleQuiz}>
            Inciar Quiz
          </Button>
          <Link className="btn btn-primary" to={"/question/new"}>
            Criar Questão
          </Link>
          <Link className="btn btn-secondary" to="/profile">
            Voltar para o Início
          </Link>
        </div>
      </div>
    </div>
  );
}
