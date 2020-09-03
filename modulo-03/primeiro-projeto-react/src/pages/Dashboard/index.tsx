import React from 'react';
import { Title } from './styles';


const Dashboard: React.FC = () => { // consegue definir a tipagem da função mais fácil
    //React.FC = Function Component
    return (
        <div>
            <Title>Explore repositórios no GitHub.</Title>
        </div>
    )

}


export default Dashboard;