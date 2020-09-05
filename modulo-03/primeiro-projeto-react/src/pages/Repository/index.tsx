import React, { useState, FormEvent, useEffect } from "react";
import logo from "../../assets/logo.svg";
import { Header, Issues, Repo } from "./styles";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";

interface RepositoryParams {
  repository: string;
}

const Repository: React.FC = () => {
  // consegue definir a tipagem da função mais fácil
  //React.FC = Function Component

  const { params } = useRouteMatch<RepositoryParams>();

  return (
    <div>
      <Header>
        <img src={logo} alt="GitHub explorer" />
        <Link to="/">
          <FiChevronLeft />
          <span>Voltar</span>
        </Link>
      </Header>

      <Repo>
        <div className="repo">
          <img
            src="https://avatars1.githubusercontent.com/u/47362960?s=460&u=99702db3dedab50f47b0f151acea1e2e9db1b3fc&v=4"
            alt=""
          />
          <div>
            <strong>{params.repository}</strong>
            <p>Descrição da repo</p>
          </div>
        </div>

        <div className="info">
          <div>
            <strong>1808</strong>
            <p>Stars</p>
          </div>
          <div>
            <strong>48</strong>
            <p>Forks</p>
          </div>
          <div>
            <strong>67</strong>
            <p>Issues abertas</p>
          </div>
        </div>
      </Repo>
      <Issues>
        <Link to="/">
          <div>
            <strong>gostack-desafio-03</strong>
            <p>Diego Fernandes</p>
          </div>
          <FiChevronRight size={20} />
        </Link>
      </Issues>
    </div>
  );
};

export default Repository;
