import React from "react";
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput
} from "react-native";
import logo from "../../assets/logo.png";

import Input from "../../components/Input";
import Button from "../../components/Button";

import { useNavigation } from "@react-navigation/native";

import Icon from "react-native-vector-icons/Feather";
import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core";

import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateButtonAccount,
  CreateButtonAccountText,
} from "./styles";
import { useCallback, useRef } from "react";

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  const handleSignIn = useCallback((data: object) => {
    console.log(data);
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
