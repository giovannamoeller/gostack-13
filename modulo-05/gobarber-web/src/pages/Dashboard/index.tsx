import React from 'react';

import { Container, Header, HeaderContent, Profile } from './styles';
import logo from '../../assets/logo.svg';
import { FiPower } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';


const DashBoard:React.FC = () => {

    const { signOut, user } = useAuth();

    return (
        <Container>
            <Header>
                <HeaderContent>
                    <img src={logo} alt="GoBarber"/>
                    <Profile>
                        <img src={user.avatar_url} alt={user.name}/>
                        <div>
                            <span>Bem vindo,</span>
                            <strong>{user.name}</strong>
                        </div>
                    </Profile>

                    <button type="button">
                        <FiPower onClick={signOut}/>
                    </button>
                </HeaderContent>
            </Header>
        </Container>
    )
}

export default DashBoard;