import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

import Img from "../../assets/quiz-banner.png";
import api from "../../services/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [category, setCategory] = useState("Aluno");

  const history = useHistory();

  async function handleNewUser(e) {
    e.preventDefault();

    const data = {
      name,
      email,
      passworld: password,
      category,
    };

    try {
      const response = await api.post("user", data);
      alert(`Seu ID de acesso: ${response.data.id}`);
      history.push("/");
    } catch (err) {
      alert("Erro no cadastro, tente novamente.");
    }
  }

  return (
    <div class="container">
      <div className="row">
        <div className="col-4">
          <h1>My Quiz</h1>
          <form onSubmit={handleNewUser}>
            <h2>Faça seu Cadastro</h2>
            <input
              className="form-control"
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              className="form-control"
              placeholder="Seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
            <input
              className="form-control"
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
            />
            <select
              className="form-control"
              placeholder="Seu Nome"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="Aluno">Sou Aluno</option>
              <option value="Professor">Sou Professor</option>
            </select>
            <Link to="/">Já tenho cadastro</Link> <br />
            <button className="btn btn-primary" type="submit">
              Cadastrar-se
            </button>
          </form>
        </div>
        <div className="col-8">
          <img src={Img} />
        </div>
      </div>
    </div>
  );
}
