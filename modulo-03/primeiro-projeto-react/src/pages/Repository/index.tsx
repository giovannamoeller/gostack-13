import React from 'react';
import { useRouteMatch } from 'react-router-dom';

interface RepositoryParams {
    repository: string;

}

const Repository: React.FC = () => {  // consegue definir a tipagem da função mais fácil
    //React.FC = Function Component
    
    const { params } = useRouteMatch<RepositoryParams>();

    
    return <h1>Repository: {params.repository}</h1>
}


export default Repository;