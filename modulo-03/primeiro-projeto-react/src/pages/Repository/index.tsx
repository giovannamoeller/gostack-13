import React, { useState, FormEvent, useEffect } from "react";
import logo from "../../assets/logo.svg";
import { Header, Issues, Repo } from "./styles";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";

import api from '../../services/api';

interface RepositoryParams {
  repository: string;
}

interface Repository {
    full_name: string;
    description: string;
    owner: {
        login: string;
        avatar_url: string;
    },
    stargazers_count: number;
    forks_count: number;
    open_issues_count: number;
}

interface Issue {
    title: string;
    id: number;
    html_url: string;
    user: {
        login: string;
    }
}

const Repository: React.FC = () => {
  // consegue definir a tipagem da função mais fácil
  //React.FC = Function Component

  const { params } = useRouteMatch<RepositoryParams>();

  const [repository, setRepository] = useState<Repository | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);


  useEffect(() => {
    api.get(`/repos/${params.repository}`).then(response => {
        setRepository(response.data);
    }).catch(err => {
        console.log(err);
    });

    api.get(`/repos/${params.repository}/issues`).then(response => {
        setIssues(response.data);
    }).catch(err => {
        console.log(err);
    });
  }, [params.repository]);

  return (
    <div>
      <Header>
        <img src={logo} alt="GitHub explorer" />
        <Link to="/">
          <FiChevronLeft />
          <span>Voltar</span>
        </Link>
      </Header>

      { repository && (
          <Repo>
          <div className="repo">
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{params.repository}</strong>
              <p>{repository.description}</p>
            </div>
          </div>
  
          <div className="info">
            <div>
              <strong>{repository.stargazers_count}</strong>
              <p>Stars</p>
            </div>
            <div>
              <strong>{repository.forks_count}</strong>
              <p>Forks</p>
            </div>
            <div>
              <strong>{repository.open_issues_count}</strong>
              <p>Issues abertas</p>
            </div>
          </div>
        </Repo>
      )}
      <Issues>
          {issues.map(issue => (
            <a href={issue.html_url} key={issue.id} target="_blank">
            <div>
                <strong>{issue.title}</strong>
                <p>{issue.user.login}</p>
            </div>
            <FiChevronRight size={20} />
            </a>
          ))}
      </Issues>
    </div>
  );
};

export default Repository;
