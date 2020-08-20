import React, { useState } from 'react';
import Header from './components/Header';

function App() {

    const [projects, setProjects] = useState(['Desenvolvimento Web', 'UI Design']);

    function handleClickButton() {
        setProjects([...projects, `Novo projeto: ${Date.now()}`]);
    }

    return (
        <> 
            <Header title="Projects"/>
            <ul>
                {projects.map(project => <li key={project}>{project}</li>)}
            </ul>
            <button type="button" onClick={handleClickButton}>
                Adicionar projeto
            </button>
        </>
    )
}

export default App;