import React, { useCallback, useRef } from 'react';
import { Container, Content, AvatarInput } from './styles';
import { FiMail, FiUser, FiLock, FiCamera, FiArrowLeft } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';

const SignUp:React.FC = () => {

    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();

    const { user } = useAuth();

    const handleSubmit = useCallback(async (data: Object) => {
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string().email('Digite um e-mail válido').required('Email obrigatório'),
                password: Yup.string().min(6, 'No mínimo 6 dígitos')
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            await api.post('/users', data);

            addToast({
                type: 'success',
                title: 'Cadastro realizado',
                description: 'Você já pode fazer seu logon',
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
                title: 'Erro na alteração',
                description: 'Ocorreu um erro ao fazer alteração, tente novamente.'
            });
        }   
    }, [addToast, history]);
    
    return (
        <Container>
        <header>
            <div>
                <Link to="/dashboard">
                    <FiArrowLeft/>
                </Link>
            </div>
        </header>
        <Content>
            <Form onSubmit={handleSubmit} ref={formRef}>
                <AvatarInput>
                    <img src={user.avatar_url} alt={user.name}/>
                    <button type="button">
                        <FiCamera/>
                    </button>
                </AvatarInput>

                <h1>Meu Perfil</h1>

                <Input name="name" type="text" icon={FiUser} placeholder="Nome" value={user.name}/>
                <Input name="email" type="email" icon={FiMail} placeholder="E-mail" value={user.email}/>

                <Input name="old_password" type="password" icon={FiLock} placeholder="Senha atual"/>
                <Input name="password" type="password" icon={FiLock} placeholder="Nova senha"/>
                <Input name="password_confirmation" type="password" icon={FiLock} placeholder="Confirmar senha"/>
                <Button type="submit">Confirmar mudanças</Button>
            </Form>
        </Content>
                    
        </Container>
    );
};

export default SignUp;