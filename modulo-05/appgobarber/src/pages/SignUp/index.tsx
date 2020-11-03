import React, { useRef, useCallback } from "react";
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert
} from "react-native";
import logo from "../../assets/logo.png";

import Input from "../../components/Input";
import Button from "../../components/Button";

import Icon from "react-native-vector-icons/Feather";
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

import {
  Container,
  Title,
  BackToLogin,
  BackToLoginText
} from "./styles";
import { useNavigation } from "@react-navigation/native";
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { TextInput } from "react-native";

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  const handleSignUp = useCallback(async (data: SignUpFormData) => {
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

        Alert.alert('Sucesso no cadastro', 
          'Você já pode fazer seu login.', 
          [
            { text: 'OK', onPress: () => navigation.navigate('SignIn')}
          ]);

        //navigation.navigate('SignIn');


    } catch(err) {
        if(err instanceof Yup.ValidationError) {
            const errors = getValidationErrors(err);

            formRef.current?.setErrors(errors);

            return;
        }   
        console.log(err)
        Alert.alert('Erro no cadastro', 
          'Ocorreu um erro ao fazer cadastro, tente novamente.');
    }   
}, []);


  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Container>
            <Image source={logo} />
            <View>
              <Title>Crie sua conta</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSignUp}>

            <Input
              name="name"
              icon="user"
              placeholder="Nome"
              placeholderTextColor="#666360"
              autoCapitalize="words"
              autoCorrect={false}
              returnKeyType="next"
              onSubmitEditing={() => {
                emailRef.current?.focus();
              }}
            />
            <Input
              ref={emailRef}
              name="email"
              icon="mail"
              placeholder="E-mail"
              placeholderTextColor="#666360"
              autoCorrect={false}
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordRef.current?.focus();
                }}
            />
            <Input
              ref={passwordRef}
              name="password"
              icon="lock"
              placeholder="Senha"
              placeholderTextColor="#666360"
              secureTextEntry={true}
              returnKeyType="send"
              onSubmitEditing={() => {
                formRef.current?.submitForm();
              }}
            />

            <Button onPress={() => formRef.current?.submitForm()}>Cadastrar</Button>

            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToLogin onPress={() => navigation.navigate('SignIn')}>
        <Icon name="arrow-left" size={20} color="#F4EDE8" />
        <BackToLoginText>Voltar para o login</BackToLoginText>
      </BackToLogin>
    </>
  );
};

export default SignUp;
