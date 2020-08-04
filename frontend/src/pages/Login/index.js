import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import Img from "../../assets/quiz-banner.png";
import api from "../../services/api";

export default function Login() {
  const [id, setId] = useState("");
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post("sessions", { id });

      localStorage.setItem("userId", id);
      localStorage.setItem("userName", response.data.name);
      history.push("/profile");
    } catch (err) {
      alert("Falha ao login, tente novamente.");
    }
  }

  return (
    <div class="container">
      <div className="row">
        <div className="col-4">
          <h1>My Quiz</h1>
          <form onSubmit={handleLogin}>
            <h2>Faça seu Login</h2>
            <input
              className="form-control"
              placeholder="Seu ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <Link to="/register">Não tenho cadastro</Link> <br />
            <button className="btn btn-primary" type="submit">
              Entrar
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
