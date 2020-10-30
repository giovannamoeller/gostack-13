import React, { useRef, useCallback } from 'react';
import logo from '../../assets/logo.svg';
import { Container, Content, Background, AnimationContainer } from './styles';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory, useLocation } from 'react-router-dom';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { FormHandles } from '@unform/core';

import { useToast } from '../../hooks/toast';
import api from '../../services/api';

interface ResetPasswordFormData {
    password: string;
    password_confirmation: string;
}

const ResetPassword:React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const { addToast } = useToast();
    const history = useHistory();
    const location = useLocation();

    const handleSubmit = useCallback(async (data: ResetPasswordFormData) => {
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                password: Yup.string().min(6, 'No mínimo 6 dígitos'),
                password_confirmation: Yup.string().oneOf([Yup.ref('password')], 'As senhas devem ser a mesma'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            const token = location.search.replace('?token=', '');
            
            if(!token) throw new Error();

            console.log(token);

            await api.post('/password/reset', {
                password: data.password,
                password_confirmation: data.password_confirmation,
                token
            });

            history.push('/');

        } catch(err) {
            
            if(err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);

                formRef.current?.setErrors(errors);

                return;
            }

            addToast({
                type: 'error',
                title: 'Erro ao resetar senha',
                description: 'Ocorreu um erro ao resetar sua senha, tente novamente.'
            });

        }   
    }, [addToast, location.search, history]);
    
    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={logo} alt="GoBarber"/>
                    <Form onSubmit={handleSubmit} ref={formRef}>
                        <h1>Resetar Senha</h1>

                        <Input name="password" type="password" icon={FiLock} placeholder="Nova senha"/>
                        <Input name="password_confirmation" type="password" icon={FiLock} placeholder="Confirmação da senha"/>
                        <Button type="submit">Alterar senha</Button>

                    </Form>
                </AnimationContainer>
            </Content>
            <Background/>
                        
        </Container>
    );
}

export default ResetPassword;