import React from 'react';
import logo from '../../assets/logo.svg';
import { Container, Content, Background } from './styles';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';

const Login:React.FC = () => (
    <Container>
        <Content>
            <img src={logo} alt="GoBarber"/>
            <form>
                <h1>Faça seu login</h1>

                <Input name="email" type="email" icon={FiMail} placeholder="E-mail"/>
                <Input name="password" type="password" icon={FiLock} placeholder="Senha"/>
                <Button type="submit">Entrar</Button>

                <a href="forgot">Esqueci minha senha</a>
            </form>
            <a href="#"><FiLogIn/>Criar conta</a>
        </Content>
        <Background/>
                    
    </Container>
);

export default Login;