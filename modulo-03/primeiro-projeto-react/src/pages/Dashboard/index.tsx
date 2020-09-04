import React from 'react';
import { Title } from './styles';
import logo from '../../assets/logo.svg';


const Dashboard: React.FC = () => { // consegue definir a tipagem da função mais fácil
    //React.FC = Function Component
    return (
        <div>
            <img src={logo} alt="Github Explorer"/>
            <Title>Explore repositórios no GitHub.</Title>
            <div className="input-form">
                <input type="text" placeholder="Digite aqui"/>
                <button type="submit">Pesquisar</button>
            </div>
        </div>
    )

}


export default Dashboard;