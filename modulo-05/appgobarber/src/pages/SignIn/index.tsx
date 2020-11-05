import React from "react";
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert
} from "react-native";
import logo from "../../assets/logo.png";

import Input from "../../components/Input";
import Button from "../../components/Button";

import { useNavigation } from "@react-navigation/native";

import Icon from "react-native-vector-icons/Feather";
import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core";
import * as Yup from 'yup';
import { useAuth } from '../../hooks/auth';

import getValidationErrors from '../../utils/getValidationErrors';

import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateButtonAccount,
  CreateButtonAccountText,
} from "./styles";
import { useCallback, useRef } from "react";

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  const { signIn } = useAuth();

  const handleSignIn = useCallback(async (data: SignInFormData) => {
    try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
            email: Yup.string().email('Digite um e-mail válido').required('Email obrigatório'),
            password: Yup.string().min(6, 'No mínimo 6 dígitos')
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        await signIn({
            email: data.email,
            password: data.password
        });

        

    } catch(err) {
        
        if(err instanceof Yup.ValidationError) {
            const errors = getValidationErrors(err);

            formRef.current?.setErrors(errors);

            return;
        }

        Alert.alert('Erro na autenticação', 
          'Ocorreu um erro ao fazer login, cheque as credenciais.');
    }   
}, [signIn]);

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
              <Title>Faça seu logon</Title>
            </View>

            <Form onSubmit={handleSignIn} ref={formRef}>
              <Input
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
                onSubmitEditing={() => formRef.current?.submitForm()}
              />

              <Button onPress={() => formRef.current?.submitForm()}>
                Entrar
              </Button>

            </Form>

            <ForgotPassword onPress={() => console.log("Oi")}>
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <CreateButtonAccount onPress={() => navigation.navigate("SignUp")}>
        <Icon name="log-in" size={20} color="#FF9000" />
        <CreateButtonAccountText>Criar uma conta</CreateButtonAccountText>
      </CreateButtonAccount>
    </>
  );
};

export default SignIn;
