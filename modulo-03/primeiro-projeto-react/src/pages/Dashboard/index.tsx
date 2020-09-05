import React, { useState, FormEvent } from "react";
import { Title, Form, Repositories } from "./styles";
import logo from "../../assets/logo.svg";
import { FiChevronRight, FiChevronsRight } from "react-icons/fi";
import Swal from 'sweetalert2';


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
    const [repositories, setRepositories] = useState<Repository[]>([]);

    async function addNewRepository(event: FormEvent) {
        event.preventDefault();
        try {
            const response = await api.get(`/repos/${newRepo}`);
            console.log(response);
            const repository = response.data;
            setRepositories([...repositories, repository]);
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'O repositório não foi encontrado!',
              });
        }
        setNewRepo('');
    }

  return (
    <div>
      <img src={logo} alt="Github Explorer" />
      <Title>Explore repositórios no GitHub.</Title>
      <Form onSubmit={addNewRepository}> 
        <input value={newRepo} onChange={(e) => setNewRepo(e.target.value)} type="text" placeholder="Digite aqui" />
        <button type="submit">Pesquisar</button>
      </Form>
      <Repositories>
          {repositories.map(repository => (
            <a href="#">
            <img
                src={repository.owner.avatar_url}
                alt={repository.owner.login}
            />
            <div>
                <strong>{repository.full_name}</strong>
                <p>{repository.description}</p>
            </div>
            <FiChevronRight size={20} />
            </a>
          ))}
      </Repositories>
    </div>
  );
};

export default Dashboard;