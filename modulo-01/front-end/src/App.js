import React, { useState, useEffect } from 'react';
import Header from './components/Header';

import './App.css';
import api from './services/api';

function App() {

    const [projects, setProjects] = useState([]); // inicializa com o mesmo tipo da variável

    useEffect(() => {
        api.get('/projects').then(response => {
            setProjects(response.data);
        })
    }, []); /* se tiver vazio, vai executar apenas quando o componente for exibido em tela, 
    se tiver variável, quando a variável alterar */

    async function handleAddProject() {
        const response = await api.post('/projects', {
            title: 'Desafio GoStack',
            owner: 'Giovanna'
        })
        setProjects([...projects, response.data])
    }

    return (
        <> 
            <Header title="Projects"/>
            <ul>
                {projects.map(project => <li key={project.id}>{project.title}</li>)}
            </ul>

            <button type="button" onClick={handleAddProject}>
                Adicionar projeto
            </button>
        </>
    )
}

export default App;