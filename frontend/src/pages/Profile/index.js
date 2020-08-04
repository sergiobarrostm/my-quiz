import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';

import './styles.css'

import api from '../../services/api';

export default function Profile(){

  const [questions, setQuestions] = useState([]);
  const userName = localStorage.getItem('userName');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    api.get(`questions/user/${userId}`).then(
      response => {
        setQuestions(response.data);
      }
    )
  });

  return(
    <div className="container">
      <div className="row">
        <div className="col-6">
          <h1>Olá, {userName}</h1>
          <label>Suas questões</label>
        </div>
        <div className="col-6">
          <Link className="btn btn-success" to="/select-subject">Responder Quiz</Link>
          <Link className="btn btn-primary" to="/question/new">Criar Questão</Link>
          <Link className="btn btn-secondary" to="/subject/new">Criar Assunto</Link>

        </div>
      </div>

    <div class="table-wrapper-scroll-y my-custom-scrollbar">
    <table className="table table-bordered table-striped mb-0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Enunciado</th>
        </tr>
      </thead>
      <tbody>
      {questions.map(questions => (
        <tr key={questions.id}>
          <td>{questions.id}</td>
          <td>{questions.title}</td>
        </tr>
      ))}
      </tbody>
    </table>
    </div>
    </div>
  );
}