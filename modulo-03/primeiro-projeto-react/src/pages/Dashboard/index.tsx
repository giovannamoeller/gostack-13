import React from "react";
import { Title, Form, Repositories } from "./styles";
import logo from "../../assets/logo.svg";
import { FiChevronRight, FiChevronsRight } from "react-icons/fi";

const Dashboard: React.FC = () => {
  // consegue definir a tipagem da função mais fácil
  //React.FC = Function Component
  return (
    <div>
      <img src={logo} alt="Github Explorer" />
      <Title>Explore repositórios no GitHub.</Title>
      <Form>
        <input type="text" placeholder="Digite aqui" />
        <button type="submit">Pesquisar</button>
      </Form>
      <Repositories>
        <a href="#">
          <img
            src="https://avatars1.githubusercontent.com/u/47362960?s=460&u=99702db3dedab50f47b0f151acea1e2e9db1b3fc&v=4"
            alt="GitHub profile"
          />
          <div>
            <strong>giovannamoeller/soundCloud-API</strong>
            <p>Utilização da API do SoundCloud.</p>
          </div>
          <FiChevronRight size={20} />
        </a>
        <a href="#">
          <img
            src="https://avatars1.githubusercontent.com/u/47362960?s=460&u=99702db3dedab50f47b0f151acea1e2e9db1b3fc&v=4"
            alt="GitHub profile"
          />
          <div>
            <strong>giovannamoeller/giphy-API</strong>
            <p>Utilização da API do Giphy.</p>
          </div>
          <FiChevronRight size={20} />
        </a>
        <a href="#">
          <img
            src="https://avatars1.githubusercontent.com/u/47362960?s=460&u=99702db3dedab50f47b0f151acea1e2e9db1b3fc&v=4"
            alt="GitHub profile"
          />
          <div>
            <strong>giovannamoeller/omnifood</strong>
            <p>Site de delivery de comidas saudáveis.</p>
          </div>
          <FiChevronRight size={20} />
        </a>
      </Repositories>
    </div>
  );
};

export default Dashboard;
