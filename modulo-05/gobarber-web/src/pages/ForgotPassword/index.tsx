import React, { useRef, useCallback, useState } from 'react';
import logo from '../../assets/logo.svg';
import { Container, Content, Background, AnimationContainer } from './styles';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { FormHandles } from '@unform/core';

import { useToast } from '../../hooks/toast';
import api from '../../services/api';

interface ForgotPasswordFormData {
    email: string;
}

const ForgotPassword:React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const [loading, setLoading] = useState(false);
    const { addToast } = useToast();
    const history = useHistory();

    const handleSubmit = useCallback(async (data: ForgotPasswordFormData) => {
        try {
            setLoading(true);
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                email: Yup.string().email('Digite um e-mail válido').required('Email obrigatório')
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            await api.post('/password/forgot', {
                email: data.email,
            });

            addToast({
                type: 'success',
                title: 'E-mail de recuperação enviado',
                description: 'Verifique sua caixa de entrada.'
            });

            history.push('/dashboard');

        } catch(err) {
            
            if(err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);

                formRef.current?.setErrors(errors);

                return;
            }

            addToast({
                type: 'error',
                title: 'Erro na recuperação de senha',
                description: 'Ocorreu um erro ao tentar realizar a recuperação de senha, tente novamente.'
            });

        } finally {
            setLoading(false);
        }
    }, [addToast, loading]);
    
    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={logo} alt="GoBarber"/>
                    <Form onSubmit={handleSubmit} ref={formRef}>
                        <h1>Recuperar Senha</h1>

                        <Input name="email" type="email" icon={FiMail} placeholder="E-mail"/>
                        <Button type="submit" loading={loading} >Recuperar</Button>

                    </Form>
                    <Link to="/signin"><FiLogIn/>Voltar ao login</Link>
                </AnimationContainer>
            </Content>
            <Background/>
                        
        </Container>
    );
}

export default ForgotPassword;