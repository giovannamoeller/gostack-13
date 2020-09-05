import React, { useState, FormEvent, useEffect } from "react";
import { Title, Form, Repositories, Error } from "./styles";
import logo from "../../assets/logo.svg";
import { FiChevronRight, FiChevronsRight } from "react-icons/fi";
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';


import api from '../../services/api';

interface Repository {
    full_name: string;
    description: string;
    owner: {
        login: string;
        avatar_url: string;
    }
}

const Dashboard: React.FC = () => {

    const [newRepo, setNewRepo] = useState('');
    const [repositories, setRepositories] = useState<Repository[]>(() => {
        const storagedRepositories = localStorage.getItem('@GitHubExplorer:repositories');

        if(storagedRepositories) {
            return JSON.parse(storagedRepositories);
        } else {
            return [];
        }
    });
    const [inputError, setInputError] = useState('');
    useEffect(() => {
        localStorage.setItem('@GitHubExplorer:repositories', JSON.stringify(repositories));
    }, [repositories]) // sempre que houver uma mudança na variável repositories

    async function addNewRepository(event: FormEvent) {
        event.preventDefault();
        if(!newRepo) {
            setInputError('Digite o autor/nome do repositório');
            return;
        }
        try {
            const response = await api.get(`/repos/${newRepo}`);
            console.log(response);
            const repository = response.data;
            setRepositories([...repositories, repository]);
            setNewRepo('');
            setInputError('');
        } catch (err) {
            setInputError('Erro na busca do repositório');
        }
    }

  return (
    <div>
      <img src={logo} alt="Github Explorer" />
      <Title>Explore repositórios no GitHub.</Title>
      <Form hasError={!!inputError} onSubmit={addNewRepository}> 
        <input value={newRepo} onChange={(e) => setNewRepo(e.target.value)} type="text" placeholder="Digite aqui" />
        <button type="submit">Pesquisar</button>
      </Form>
    {inputError && <Error>{inputError}</Error>}
      <Repositories>
          {repositories.map(repository => (
            <Link to={`/repository/${repository.full_name}`} key={repository.full_name}>
            <img
                src={repository.owner.avatar_url}
                alt={repository.owner.login}
            />
            <div>
                <strong>{repository.full_name}</strong>
                <p>{repository.description}</p>
            </div>
            <FiChevronRight size={20} />
            </Link>
          ))}
      </Repositories>
    </div>
  );
};

export default Dashboard;