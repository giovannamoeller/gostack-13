import React from 'react';
import { Image, Text } from 'react-native';
import logo from '../../assets/logo.png';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Title } from './styles';

const SignIn: React.FC = () => {
    return (
        <Container>
            <Image source={logo}/>
            <Title>Faça seu logon</Title>

            <Input name="email" icon="mail" placeholder="E-mail" placeholderTextColor="#666360"/>
            <Input name="password" icon="lock" placeholder="Senha" placeholderTextColor="#666360"/>

            <Button onPress={() => console.log('Oi')}>Entrar</Button>
        </Container>
    )
}

export default SignIn;