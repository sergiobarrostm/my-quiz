import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

export default function NewSubject() {
  const [name, setName] = useState();
  const userId = localStorage.getItem("userId");

  async function handleNewSubject(e) {
    e.preventDefault();

    const data = { name };

    try {
      await api.post("subject", data, {
        headers: {
          authorization: userId,
        },
      });
      alert("Assunto Cadastrado com Sucesso!");
    } catch (err) {
      alert("Erro ao cadastrar o assunto, tente novamente");
    }
  }

  return (
    <div class="container">
      <h1 className="row">Cadastrar um assunto</h1>

      <div className="row">
        <div className="col-6">
          <input
            required
            className="form-control"
            placeholder="Assunto"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div class="col-6">
          <button className="btn btn-success" onClick={handleNewSubject}>
            Criar Assunto
          </button>
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
