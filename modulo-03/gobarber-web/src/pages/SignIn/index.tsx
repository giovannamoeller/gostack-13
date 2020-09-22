import React, { useRef, useCallback } from 'react';
import logo from '../../assets/logo.svg';
import { Container, Content, Background } from './styles';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { FormHandles } from '@unform/core';

import { useAuth } from '../../hooks/AuthContext';

interface SignInFormData {
    email: string;
    password: string;
}

const SignIn:React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const { signIn } = useAuth();

    const handleSubmit = useCallback(async (data: SignInFormData) => {
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                email: Yup.string().email('Digite um e-mail válido').required('Email obrigatório'),
                password: Yup.string().min(6, 'No mínimo 6 dígitos')
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            signIn({
                email: data.email,
                password: data.password
            });

        } catch(err) {
            
            if(err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);

                formRef.current?.setErrors(errors);
            }

        }   
    }, [signIn]);
    
    return (
        <Container>
            <Content>
                <img src={logo} alt="GoBarber"/>
                <Form onSubmit={handleSubmit} ref={formRef}>
                    <h1>Faça seu login</h1>

                    <Input name="email" type="email" icon={FiMail} placeholder="E-mail"/>
                    <Input name="password" type="password" icon={FiLock} placeholder="Senha"/>
                    <Button type="submit">Entrar</Button>

                    <a href="forgot">Esqueci minha senha</a>
                </Form>
                <a href="#"><FiLogIn/>Criar conta</a>
            </Content>
            <Background/>
                        
        </Container>
    );
}

export default SignIn;