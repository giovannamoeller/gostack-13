import React from 'react';
import logo from '../../assets/logo.svg';
import { Container, Content, Background } from './styles';
import { FiMail, FiUser, FiLock, FiArrowLeft } from 'react-icons/fi';
import { Form } from '@unform/web';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp:React.FC = () => {
    function handleSubmit(data: Object) {
        console.log(data)
    }
    return (
        <Container>
        <Background/>
        <Content>
            <img src={logo} alt="GoBarber"/>
            <Form onSubmit={handleSubmit}>
                <h1>Faça seu cadastro</h1>

                <Input name="name" type="text" icon={FiUser} placeholder="Nome"/>
                <Input name="email" type="email" icon={FiMail} placeholder="E-mail"/>
                <Input name="password" type="password" icon={FiLock} placeholder="Senha"/>
                <Button type="submit">Cadastrar</Button>
            </Form>
            <a href="#"><FiArrowLeft/>Voltar para o login</a>
        </Content>
                    
        </Container>
    );
};

export default SignUp;